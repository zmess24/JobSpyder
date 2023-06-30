<img src="logo.png" width="600px"/>

A flask application that serves a react front-end, which scrapes open roles from greenhouse.io and lever.com and aggregates them in an easy to use UI.

## How it Works

JobSpyder scrapes & scrubs all open listings from a curated set of companies through greenhouse.io & lever.com every morning at 9:00AM, and stores them in MongoDB via the Atlas cloud database.

JobSpyder additionally leverages client-side caching to save all chosen job filter settings without the user needing to log-in, in order

## Technologies

JobSpyder is built using the following primary technologies:

| **Tech**                                             | **Description**                                                                                                                 |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [Flask](https://flask.palletsprojects.com/en/2.3.x/) | A micro web framework written in Python                                                                                         |
| [Scrapy](https://scrapy.org/)                        | An open source and collaborative framework for extracting the data you need from websites.                                      |
| [React](https://react.dev/)                          | The library for web and native user interfaces.                                                                                 |
| [Tailwind](https://tailwindcss.com/)                 | A utility-first CSS framework.                                                                                                  |
| [Heroku](https://www.heroku.com)                     | Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud. |
