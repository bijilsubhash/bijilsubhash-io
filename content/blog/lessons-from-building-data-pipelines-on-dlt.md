+++
title = "Lessons from Building Data Pipelines on DLT: Part 1"
date = "2024-11-03"
author = "Bijil Subhash"
tags = ["Data Ingestion", "DLT"]
draft = true
+++

Couple of months ago, I [shared](https://bijilsubhash.io/blog/exploring-dlt-for-data-ingestion/) my initial experience with Data Load Tool (DLT). Since then, I have been building some projects with the help of their documentation and Slack community. I was drawn to DLT due to its Python-first approach when it comes to data engineering. In addition to developing a deeper sense of appreciation towards idiomatic Python, over the course of the last two months, I have had the opportunity to work with a handful of features in DLT, which I hope to leverage in some real-world projects in the near-future. In this article, I wanted to do a deeper dive into some of the features and lessons that I learnt from building data pipelines using DLT.

Note, this article predominantly refers to the use of RESTful APIs as data sources even though DLT offers a multitude of other options as well for data sources when it comes to data ingestion.

# RESTClient

DLT offers [REST API source](https://dlthub.com/docs/devel/dlt-ecosystem/verified-sources/rest_api/basic), which is a declarative framework to define API endpoints, handling pagination, and authentication. Though it is completely appropriate to use this for most use cases, I found it more intuitive to work with [RESTClient](https://dlthub.com/docs/devel/general-usage/http/rest-client) which is the underlying class used for REST API source. It might have been due to my inability to keep up with the lengthy json structure used to define API endpoints in the former. RESTClient on the other hand was slightly more Pythonic, at least that was my impression of it. It also comes with built-in paginators and authentication strategies even though I ended up building a few custom paginators and authentication classes for my use cases. Boiler plate code for custom paginators and authentication can be found in the documentation. I would say that the built-in options would likely cover a large number of use cases. I was dealing with particularly challenging endpoints, and hence I chose to build a few custom modules. In addition to the paginators and authentication strategies, you can also pass [JSONPath](https://github.com/h2non/jsonpath-ng?tab=readme-ov-file#jsonpath-syntax) selector as a parameter to specify how data should be extracted from the JSON response.  Overall, building a foundation with RESTClient has allowed me to look under the hood of REST API source, providing some additional context and confidence to work with REST API source directly in the future.

# Incremental Load

We live in a world where we have cheap cloud storage but the compute cost remains high. It is, therefore, in our best interest to optimize the data ingestion pipelines such that the amount of compute required to process the data is minimized. To this end, a strategy that is commonly implemented is to load the data incrementally i.e. only ingest new data as opposed to full load when a pipeline is triggered. Fortunately, DLT supports [incremental load with a cursor field](https://dlthub.com/docs/general-usage/incremental-loading#incremental-loading-with-a-cursor-field). 