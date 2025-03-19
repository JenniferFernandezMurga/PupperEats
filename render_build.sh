#!/usr/bin/env bash
# exit on error
set -o errexit

cd src/front
npm install
npm run build
cd ../..

pipenv run flask db upgrade

pipenv run flask insert-test-users 5
pipenv run flask insert_data_catfood
pipenv run flask insert_data_dogfood
pipenv run flask insert_data_exoticfood
pipenv run flask insert_data_accessories
pipenv run flask insert_data_pet

pipenv install
