.PHONY: init
init:
	@cp .env.sample .env
	@make init-react
	@echo "Success!🎉"
	@echo "Please run 'make start'"

.PHONY: init-react
init-react:
	@cp ./typescript/apps/react/.env.local.sample ./typescript/apps/react/.env.local

.PHONY: stop
stop:
	@docker-compose down

.PHONY: start
start:
	@docker-compose up -d

.PHONY: restart
restart:
	@make stop
	@make start
