[![CI](https://github.com/wix/velo-external-db/actions/workflows/main.yml/badge.svg)](https://github.com/wix/velo-external-db/actions/workflows/main.yml)

# Wix Velo External database connector

## Overview

When you [enable Velo](https://support.wix.com/en/article/enabling-velo) on your Wix site you also automatically get [Wix Data](https://support.wix.com/en/article/about-wix-data) APIs, which lets you work with Wix built-in databases on your site. But if you want to work with a data that you own and manage in an external database, Velo lets you connect your site to an external database and then work with that database collection in your site just as you would with our built-in collections.

That means that you can use wix-data APIs, display data from an external collection in Editor elements, use the data to create dynamic pages and connect it to user input elements.

This is Wix maintained reference implementation of the [wix-data SPI](https://www.wix.com/velo/reference/spis/external-database-collections) that allows developing external database connectors that are not oficially supported by Wix yet.

## Architecture

The external database consists of the adapter, a Node.js server that implements the wix-data SPI. The server communicates with a database using DB native protocol on one side, translates the data into wix-data format and communicates with Wix site using REST over HTTPS.
![Architecture diagram](https://d2x3xhvgiqkx42.cloudfront.net/12345678-1234-1234-1234-1234567890ab/11e10e4f-b84d-4136-a5a9-6109fab0b7d7/2021/02/28/2ea08bbb-fd80-4867-a96e-f1e6ace75200/3a60c87f-2a76-4070-8cd2-88061df85565.png)

### Deployment considerations

Wix provides pre-built Docker image that is ready to be deployed because of the architecture described above, it is advisable to run the adapter container as close as possible to a database. The reason behind this is to minimize roundtrips of database native protocol traffic that in many cases wouldn't be as efficient as http/2 that adapter is using to communicate with a Wix site. There are also security and firewall configuration that might be required between the connector and database. While you might run the container on any infrastructure of your choice, we provide out of the box support and scripts for deploying to the following products available on major public clouds:
* [Google Cloud Run](https://cloud.google.com/run) - fully managed serverless platform
* [Amazon App Runner](https://aws.amazon.com/apprunner/) - fully managed serverless platform
* [Microsoft Azure App Service](https://azure.microsoft.com/en-us/services/app-service/#overview) - fully managed serverless platform
* [Knative](https://knative.dev/docs/) for self-managed or on-prem environments

## Choosing right DB Engine for a site workload

In most cases where data collections don't exceed 10K records, built-in database is the best choise for building a web site. It has native support for PII encryption, GDPR and other non functional concerns. But if there are requirements for data locality, regulations or data workload specific concerns, this connector enables connecting external database engines to your site. There are lot of materials on the internet for a database comparisons, benchmarks, etc, but the rule of thumbs for working with data on a web site is saying the following:

* If the dataset is less of 10K records, don't bother, use built-in wix-data database
* If the dataset is between 10K to 1M records and it is being used for production workloads for user facing pages rendering, use relational databases like Postgres, MySQL, Microsoft SQL Server or Google Cloud Spanner.
* If the dataset exeeds 1M records and it is mainly used for reporting, think about Google BigQuery, Snowflake or other big data DB engine.

If neither case is applicable to your case, the choice for a DB engine powering the Wix site should be made according to specific requirements.

## Supported databases and limitations

Here is the list of databases supported by the adapter:

* [MySQL](https://www.mysql.com)
  Supported versions 5.7 to 8.0. Although MySQL variants like MariaDB and Percona Server for MySQL are not tested, it should work transparently since MySQL APIs are fully compaitable. The following managed versions of MySQL tested to work with the connector:
  * Google Cloud SQL for MySQL
  * Amazon RDS for MySQL and MariaDB
  * AWS Aurora for MySQL
  * Microsoft Azure MySQL
* [Postgres](https://www.postgresql.org)
  Supported versions 12, 13.
* MongoDB
* Microsoft SQL Server
* Google Cloud Spanner
* Google Cloud Firestore
* Amazon Aurora
* Google Sheets and Bigsheets
* Airtable

## Supported Public clouds

* Google Cloud
  * [Deploying connector to Cloud Run](https://support.wix.com/en/article/using-your-mysql-and-postgres-database-with-velo)
  * Deploying connector to AppEngine
* Amazon Web Services
  * Deployng connector to App Runner
* Microsoft Azure
  * Deploying connector to Azure App Services
  * Deployng connector to Azure Container service

## Working with on prem external database

## Read Only vs Read Write collections

## Datatypes mappings

## Developing or extending the Connector
