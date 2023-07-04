.PHONY: init-e2e
init-e2e:
	@cd ./test/e2e/web && pnpm install

.PHONY: init-react
init-react:
	@cp ./typescript/apps/react/.env.local.sample ./typescript/apps/react/.env.local

.PHONY: init
init:
	@cp .env.sample .env
	@make init-react
	@make init-e2e
	@echo "Success!🎉"
	@echo "Please run 'make start'"

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

.PHONY: run-e2e
run-e2e:
	@cd ./test/e2e/web && pnpm test
