.PHONY: setup devrun prdrun test

all: main

main: setup devrun

setup:
	pip install pipenv
	pipenv install

devrun:
	pipenv run devstart

prdrun:
	pipenv run prdstart

test:
	pipenv run teststart

