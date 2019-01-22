.PHONY: setup devrun prdrun

all: main

main: setup devrun

setup:
	pip install pipenv
	pipenv install

devrun:
	pipenv run devstart

prdrun:
	pipenv run prdstart

