+++
title = "Exploring the Capabilties of Data Load Tool (DLT)"
date = "2024-08-04"
aliases = ["exploring-dlt-for-data-ingestion"]
author = "Bijil Subhash"
tags = ["data ingestion", "open source"]
+++

By and large, there is no shortage of data products coming into the market. Below is a snapshot of 2024 Machine Learning, AI and Data landscape, which has 2011 logos in total. It is incredibly difficult to pinpoint what is good amongst all of this. However, every now and then, there is a team behind a product that attempts to do something different. This article is about one such tool that I believe has a strong case to make an impact in its category.

![mad](/img/mad.png)
*Source: [Matt Turck](https://mattturck.com/mad2024/)*

It goes by the name data load tool (DLT). I stumbled across DLT on [Reddit](https://www.reddit.com/r/dataengineering/comments/1cruwsj/introducing_the_dlthub_declarative_rest_api/). Briefly after that, and on a completely unrelated topic, I also had a discussion with [Adrian Brudaru](https://www.linkedin.com/in/data-team/), one of the co-founders of DLT, on everything else but DLT. Few months later, after seeing the bouts of DLT at few places, I have decided to spend some time exploring it.

# What is Data Load Tool (DLT)?

From the [documentation](https://dlthub.com/docs/intro):

> `dlt` is an open-source library that you can add to your Python scripts to load data from various and often messy data sources into well-structured, live datasets.

In other words, you can move data around by just writing a few lines of Python, which you can easily run as part of your CI/CD pipeline, serverless functions, Apache Airflow or wherever you have a Python runtime.  

The ultimate goal for DLT is to reduce the complexity of spinning up reliable and robust data pipelines with the use of declarative low maintenance code. Additionally, it also has a few out of the box features catered for schema inference, schema evolution, alerts, and more coming in the future (I hope).

# Why does it matter?

Data engineers spend a considerable amount of time moving data from source to sink, which later gets picked up by the transformation logic for answering critical business questions. Historically, moving data from one place to another is considered to be one of the most time consuming tasks for data engineers. From a business perspective, the requirement is simple, data pipelines have to be reliable and economical. <cite>On the market, there are a bunch of tools for data ingestion, but the general feedback for most of them is that they are either too expensive, not flexible enough, has a steep learning curve, comes with vendor lock-in or does not have sufficient support. Overall, the lack of developer friendly tool has been a hindrance to reliable and economical data ingestion practices.[^1]</cite>

[^1]: [22 Best Data Integration Reviewed for 2024](https://thectoclub.com/tools/best-data-integration-tools/)

DLT in this regard is attempting something different. First and foremost, DLT is built on the principles of open source, providing businesses increased flexbility, security, and marginal costs for productionising DLT-enabled data pipelines. Secondly, by providing a Python library with builtin abstractions, DLT is empowering data engineers from all levels with the best practices around data ingestion. Lastly, DLT has an amazing team of data engineers and community who are relentlessly supporting the vision. Overall, having a tool like DLT that can seamlessly spin up data pipelines in a reliable and repeatable manner while following the best practices is an absolute game changer.

If I can summarise DLT in one sentence:
> DLT is trying to do what data build tool (dbt) has done to Transformation (T) to Extract and Load (EL).

For those reasons, I am really excited to learn more about DLT. However, as with anything, it is too early to say what the future holds for DLT in the data engineering space.

# How does DLT work?

At the root of it, what happens within a DLT pipeline can be broken down into three steps; starting with extract then normalize followed by load as shown in the figure below.

{{< mermaid >}}
flowchart LR
    A(Extract) --> B(Normalize)
    B --> C(Load)
    classDef process font-size:28px;
    class A,B,C process;
{{< /mermaid >}}
*Figure: A DLT pipeline under the hood*

Extract refers to the process of fetching and writing the data from the source system to local disk by leveraging Python generators. The data from the generator is normalized, wherein a series of operation such as schema inference/evolution and splitting nested data into parent and child tables with appropriate join keys are undertaken. The load block corresponds to the sending of data files persisted from normalization to the chosen destination. Additionally, DLT is also equipped with different types of write dispositions and fault tolerance strategies to streamline the overall developer experience.

# Let's look at an example

With all of that context in place, let's review the steps involved for creating and orchestrating a simple data pipeline using DLT and Github Actions. The goal here is to load data from an API into BigQuery daily. I chose BigQuery for no particular reason except for my familiarity with it. You are welcome to swap BigQuery for Duckdb, Redshift etc if that's your preference. The documentation has a wide range of [destinations](https://dlthub.com/docs/dlt-ecosystem/destinations/) that are compatible with DLT. If you would like to follow along, here is the [git repository](https://github.com/bijilsubhash/dlt-api-load-ex1/tree/main).

The API that I will be using in this example will be the [Adzuna Search API](https://developer.adzuna.com/docs/search), which is an API that provides job listing from [Adzuna](https://www.adzuna.com.au/). The goal here is to load every jobs under the keyword 'data engineer' in Australia that was uploaded to the portal in the last 7 days. Since we are requesting the last 7 days of data everyday, the pipeline should be able to handle deduplication of records as it is likely that records that already exist in the table will be included in the API response.

Before we get started, to ensure a clean, isolated workspace for your projects and to avoid conflicts between dependencies, it is highly recommended to use virtual environments wherever possible. Here are the instruction to setup your own [virtual environment](https://realpython.com/python-virtual-environments-a-primer/).

After the activating your virtual environment, setting up a dlt project is straightforward. It starts with the installation of dlt library, which in my case also required BigQuery dependencies using the following command:

```bash
pip install "dlt[bigquery]"
```

After the library installation, you can go ahead and [set up the connection with BigQuery](https://dlthub.com/docs/dlt-ecosystem/destinations/bigquery) (steps 3-7).

The pipeline logic lives in `adzuna.py`, wherein the pipeline configuration is defined in a function called `get_jobs()`.

```python
@dlt.resource(
        table_name="adzuna", 
        write_disposition="merge", 
        primary_key='id', 
        columns={"location": {"data_type": "complex"}}
        )
def get_jobs(APP_ID, APP_KEY):
    page_number = 1
    while True:
        params = {
            'app_id': APP_ID, 
            'app_key': APP_KEY, 
            'results_per_page': 1000, 
            'what': 'data engineer', 
            'max_days_old': 7
            }
        url = f"https://api.adzuna.com/v1/api/jobs/au/search/{page_number}"
        response = requests.get(url, params)
        response.raise_for_status()
        if response.json()['results']:
            yield response.json()['results']
            page_number += 1
            continue
        break
```

The code starts with a decorator `@dlt.resource()`. A decorator is an Pythonic approach to change the behavior of a function without making any actual changes to the wrapped function. In a way, it is meant to extend the behaviour of `get_jobs()` by leveraging pre-defined logic in `dlt.resource()`. This is the simplicity that DLT offers, where you can seamlessly take advantage of the modular units of code without having to write the lower level details.  

In my case, in addition to passing the API keys (`APP_ID` and `APP_KEY`), we are also providing other pipeline configuration such as name of the table where the data should be loaded (`table_name`), what write disposition strategy and how (`merge` using `primary_key`), and also a very specific requirement on how to handle a specific set of `columns` in the JSON response.

After the configuration is defined, we can run the pipeline using the command below:

```python
    pipeline = dlt.pipeline(
        pipeline_name="adzuna",
        destination="bigquery",
        dataset_name="jobs"
    )
    APP_ID = os.environ['APP_ID']
    APP_KEY = os.environ['APP_KEY']
    load_info = pipeline.run(get_jobs(APP_ID, APP_KEY))
    print(load_info)
```

Successfully running the job will result in the following message:

```bash
Pipeline adzuna load step completed in 15.47 seconds
1 load package(s) were loaded to destination bigquery and into dataset jobs
The bigquery destination used ***@*** location to store data
Load package 1722664897.1609821 is LOADED and contains no failed jobs
```

Before we look at the data that was loaded into the table. Let's review the API response.

```json
{
  "category": {
    "__CLASS__": "Adzuna::API::Response::Category",
    "tag": "it-jobs",
    "label": "IT Jobs"
  },
  "adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiMWgtWmprNVM3eEdvY2VlVXl2YXFkdyIsImkiOiI0ODAxOTU4NTA1In0.k9EHIolC4nsF8EIT5PyLPYtxYh4mquPKIjL176Wiz7c",
  "location": {
    "__CLASS__": "Adzuna::API::Response::Location",
    "display_name": "The Rocks, Sydney",
    "area": [
      "Australia",
      "New South Wales",
      "Sydney Region",
      "Sydney",
      "The Rocks"
    ]
  },
  "redirect_url": "https://www.adzuna.com.au/details/4801958505?utm_medium=api&utm_source=a62734ba",
  "longitude": 151.206616,
  "salary_max": 139559,
  "company": {
    "__CLASS__": "Adzuna::API::Response::Company",
    "display_name": "NSW Government"
  },
  "description": "Employment Type: Permanent Full Time, working 38 hours per week Location: Liverpool Hospital, Eastern Campus Position Classification: Health Manager Level 3 Remuneration: $122,850.00 - $139,559.00 per annum Requisition ID: REQ506063 Application Close Date: 18/08/2024 Interview Date Range: 21/08/2024 \u2013 28/08/2024 Contact Details: Christine Fan \u2013 0423 799 225 | Christine.fanhealth.nsw.gov.au About the Opportunity Be part of the future of healthcare. South Western Sydney is seeking a talented and \u2026",
  "contract_type": "permanent",
  "id": "4801958505",
  "contract_time": "full_time",
  "latitude": -33.865715,
  "salary_min": 122850,
  "title": "Data Engineer (Health Mgr Lvl 3) - Perm FT",
  "salary_is_predicted": "0",
  "created": "2024-07-31T14:04:38Z",
  "__CLASS__": "Adzuna::API::Response::Job"
}
```

Clearly, the JSON response from Adzuna has a complex schema involving nested fields, which is not uncommon with API outputs. Few key observations to call out here is the struct type for `category` and `company`. In addition to that, `location` is also a struct with an array within it. So how does DLT handle this schema.

Let's look at the data that was loaded into BigQuery (see JSON below). Note,  I am sharing the JSON version here for brevity where each row in the JSON corresponds to a row in the table, and the key-value pair represents the column and the corresponding value in the row, respectively. In this case, we are only going to look at just one row of data to review the schema and data that was loaded from the pipeline.

```json
{
  "location": {
    "__CLASS__": "Adzuna::API::Response::Location",
    "area": [
      "Australia",
      "New South Wales",
      "Sydney Region",
      "Sydney",
      "The Rocks"
    ],
    "display_name": "The Rocks, Sydney"
  },
  "category__label": "IT Jobs",
  "category__tag": "it-jobs",
  "category___classxx": "Adzuna::API::Response::Category",
  "redirect_url": "https:\\/\\/www.adzuna.com.au\\/details\\/4801958505?utm_medium=api&utm_source=a62734ba",
  "salary_is_predicted": "0",
  "adref": "eyJhbGciOiJIUzI1NiJ9.eyJpIjoiNDgwMTk1ODUwNSIsInMiOiJSdVdkRFNkUzd4R29jZWVVeXZhcWR3In0.YWE-_60arPueMRJ-P2T6MrU4AV8oaBMEM0rGdWFiXgY",
  "id": "4801958505",
  "longitude": 151.206616,
  "_classxx": "Adzuna::API::Response::Job",
  "description": "Employment Type: Permanent Full Time, working 38 hours per week Location: Liverpool Hospital, Eastern Campus Position Classification: Health Manager Level 3 Remuneration: $122,850.00 - $139,559.00 per annum Requisition ID: REQ506063 Application Close Date: 18\\/08\\/2024 Interview Date Range: 21\\/08\\/2024 \\u2013 28\\/08\\/2024 Contact Details: Christine Fan \\u2013 0423 799 225 | Christine.fanhealth.nsw.gov.au About the Opportunity Be part of the future of healthcare. South Western Sydney is seeking a talented and \\u2026",
  "title": "Data Engineer (Health Mgr Lvl 3) - Perm FT",
  "created": 1722434678000,
  "contract_type": "permanent",
  "latitude": -33.865715,
  "company__display_name": "NSW Government",
  "company___classxx": "Adzuna::API::Response::Company",
  "_dlt_load_id": "1722751315.437876",
  "_dlt_id": "rkhz7H3FstLdxg",
  "salary_max": 139559,
  "contract_time": "full_time",
  "salary_min": 122850
}
```

The schema of the table matches the JSON with a few modifications on how struct fields were handled and the addition of two new metadata fields (`_dlt_load_id` and `_dlt_id`). The fields within the struct `category` and `company` were normalized with a double underscore naming convention (Eg: `category__label`). The inbuilt schema inference engine was able to successfully flatten the nested fields within those structs.

The `location` field however remains untouched. The default behaviour in DLT with struct is to create new fields as reported above. However, when there is an array within the struct, the array is loaded into a child table, which can be joined with the parent table to normalize in a downstream table or view. Though this is a viable option, BigQuery recommends [using nested and repeated fields for denormalization](https://cloud.google.com/bigquery/docs/best-practices-performance-nested), alleviating the need to put any additional burden on the performance of the table with parent-child table joins. As such, I wanted to leave the `location` field as it is and deal with transforming the struct into a nested/repeated field at a later stage. We can acheive this behaviour in DLT by [directly defining the data types](https://dlthub.com/docs/general-usage/schema#data-types) for a specific field in the pipeline configuration, which was provided for `location` in `get_jobs()` function. As a result, dlt maintained the source schema for `location` and did not attempt to flatten or create a child table out of it.

Overall, our result has highlighted DLT's capability for not only inferring the complex schema but also its flexiblity when it comes to modyfying the default behaviour in a declarative manner. Running this pipeline everyday will ensure that data is loaded daily as per the requirements. Furthermore, the write disposition strategy used here will ensure that data is loaded incrementally without any duplicates.

The next step in our example is orchestration. When it comes to orchestration, DLT offers a few out of the box [integrations](https://dlthub.com/docs/walkthroughs/deploy-a-pipeline). We will keep it simple for this exercise and deploy this pipeline in Github Actions, which requires the installation of the following pacakge:

```bash
pip install "dlt[cli]"
```

After the installation, just execute the command below to generate the `.github/workflows/run_adzuna_workflow.yml`. When in doubt, follow the [instructions](https://dlthub.com/docs/walkthroughs/deploy-a-pipeline/deploy-with-github-actions) provided in the documentation.

```bash
dlt deploy adzuna.py github-action --schedule "0 6 * * *" 
```

I cleaned up the `run_adzuna_workflow.yml` slightly (see below) and added the secrets as per the documentation.

```yml
name: Run adzuna pipeline from adzuna.py
on:
  schedule:
    - cron: 0 6 * * *
  workflow_dispatch: null
env:
  DESTINATION__BIGQUERY__LOCATION: US
  DESTINATION__BIGQUERY__CREDENTIALS__PROJECT_ID:
    ${{ secrets.DESTINATION__BIGQUERY__CREDENTIALS__PROJECT_ID }}
  DESTINATION__BIGQUERY__CREDENTIALS__CLIENT_EMAIL:
    ${{ secrets.DESTINATION__BIGQUERY__CREDENTIALS__CLIENT_EMAIL }}
  DESTINATION__BIGQUERY__CREDENTIALS__PRIVATE_KEY:
    ${{ secrets.DESTINATION__BIGQUERY__CREDENTIALS__PRIVATE_KEY }}
jobs:
  run_pipeline:
    runs-on: ubuntu-latest
    steps:
      - name: Check out
        uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: 3.10.x
      - uses: syphar/restore-virtualenv@v1
        id: cache-virtualenv
        with:
          requirement_files: requirements_github_action.txt
      - uses: syphar/restore-pip-download-cache@v1
        if: steps.cache-virtualenv.outputs.cache-hit != 'true'
      - run: pip install -r requirements_github_action.txt
        if: steps.cache-virtualenv.outputs.cache-hit != 'true'
      - name: Run pipeline script
        run: python 'adzuna.py'
        env:
          APP_ID: ${{ secrets.APP_ID }}
          APP_KEY: ${{ secrets.APP_KEY }}
```

The configuration above will trigger Github Actions to run `adzuna.py` everyday at 6 am, loading the delta of jobs with the keyword 'data engineer' that was posted to the portal in the last 7 days.

# Closing thoughts

My initial take on DLT is that it has a lot of potential to make a significant impact on teams that are looking to elevate their data ingestion experience. Furthermore, it has also occured to me that the philosophy and design considerations behind DLT comes from a place of having experienced and overcoming the challenges associated with data ingestion in the first place. I am looking forward to exploring more of DLT and want to see how it integrates with the rest of the data stack. I also plan on spending some time understanding the scalability and advanced table materialisations offered by DLT in the future.
