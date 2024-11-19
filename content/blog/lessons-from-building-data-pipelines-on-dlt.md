+++
title = "Lessons from Building Data Pipelines on DLT: Part 1"
date = "2024-11-03"
author = "Bijil Subhash"
tags = ["Data Ingestion", "DLT"]
+++

Couple of months ago, I [shared](https://bijilsubhash.io/blog/exploring-dlt-for-data-ingestion/) my initial experience with Data Load Tool (DLT). Since then, I have been building some projects with the help of their [documentation](https://dlthub.com/docs/intro) and the active Slack community. The Python-first approach of DLT greatly appealed to me as a data engineer. Over the past two months, I’ve deepened my appreciation for idiomatic Python while exploring and applying several of DLT’s features, which I am eager to leverage in real-world projects. In this article, I’ll dive into some key DLT features and the lessons learned from building data pipelines.

Note: While this article predominantly refers to the use of RESTful APIs as data sources, DLT's versatility extends to many other options, which I will discuss in future posts.

# RESTClient

DLT offers [REST API source](https://dlthub.com/docs/devel/dlt-ecosystem/verified-sources/rest_api/basic), which is a declarative framework to define API endpoints that has dedicated configuration parameter for handling pagination and authentication. REST API source is powered by [RESTClient](https://dlthub.com/docs/devel/general-usage/http/rest-client) class, which has a paginate method for fetching data from API responses. Generally, if you were building an ingestion pipeline using Python, you are likely writing a custom method for handling pagination and authentication. Luckily, DLT has a few immensely flexible classes that allows you to handle these scenarios elegantly. At the same time, you also have the option to build custom paginators and authenticators if there is a need for it. Additionally, you have the option to pass [JSONPath](https://github.com/h2non/jsonpath-ng?tab=readme-ov-file#jsonpath-syntax) selectors as a parameter to specify what data should be extracted from deeply nested responses.  Overall, working with RESTClient gives you the opportunity to build reliable pipelines seamlessly.

# Incremental Load

We live in a world where we have cheap cloud storage but the compute cost remains high. It is, therefore, in our best interest to optimize the data ingestion pipelines such that the amount of compute required to process the data is minimized. To this end, a strategy that is commonly implemented is to load the data incrementally i.e. only ingest new data as opposed to full load when a pipeline is triggered. Fortunately, DLT supports [incremental load with a cursor field](https://dlthub.com/docs/general-usage/incremental-loading#incremental-loading-with-a-cursor-field), which in a nutshell uses a field (usually a date field) from the response to track the state and is made available on the next pipeline run to extract only the most recent values. I highly recommend playing around with this feature to get a thorough understanding of all the nuances associated with setting up incremental load in DLT.

# Destination

We have a few options when it comes to [destinations](https://dlthub.com/docs/dlt-ecosystem/destinations/) in DLT, such as Google BigQuery, Databricks, Cloud Storage to name a few. You can also write custom destinations if you wish. My use cases were predominantly focused on populating data lakes in cloud storage. As such, I have made use of cloud storage destination such as Azure Blob Storage for storing the data extracted from API responses. In the definition of a destination, you can specify what write disposition strategy to use, table name, path layout if it is a file system, and file format. DLT also stores the information about the pipeline state at this destination along with your data, which is used for performing incremental load and/or supporting different write disposition strategies.

# Transformers

Have you come across a use case where you needed to get an ID from a endpoint, for instance ID of a customer, and use that to lookup details about the customer in a different endpoint. This is precisely the usage pattern where you would make use of [transformers](https://dlthub.com/docs/general-usage/resource#process-resources-with-dlttransformer), allowing you to feed data from one resource into another, which is quite powerful when dealing with standard RESTful APIs.

# Optimization

Building a functional pipeline is a goal for many data engineers. However, functionality alone is not sufficient to make them reliable in production. First and foremost, data pipelines must be compatible with the available memory such that extract, normalize and load phases in a DLT pipeline runs successfully. Secondly, as previously alluded to when we were discussing the need for incremental data processing, compute resources are an expensive commodity, implying that we must avoid wasting compute at all costs. Parallelization allows you to run multiple processes at the same time, which also happens to be a strategy that maximizes the usage of compute resources. Striking a balance between parallelism and memory utilization is not an easy endeavor. In DLT, however, you can optimize for both by simply turning the knobs on a handful of [configurations](https://dlthub.com/docs/reference/performance) such as enabling file rotations, enabling/disabling file compressions, controlling the number of workers and more. Unfortunately, there are no magic formula for setting these parameters, and it is up to the engineers to iterate through them to figure out the optimal configuration based on the business needs and resource availability. My recommendation here will be to familiarize yourself with these options while taking into account about the different compute configurations in local and production environment.

# Closing Thoughts

My perspective on DLT remains optimistic. I foresee a future where DLT will be utilized by many organizations that are seeking control on building reliable and cost-efficient data pipelines. While there will always be cases where DLT’s current features might not fit specific needs, its Python-first design ensures extensibility. I’m excited to see how DLT evolves and how its adoption can empower more flexible data engineering solutions.