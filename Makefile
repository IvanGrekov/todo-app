build:
	docker build -t givneyt/todo-web-app ./
run:
	docker run -d -p 80:3000 --rm --name todo-web-app givneyt/todo-web-app
logs:
	docker logs todo-web-app
stop:
	docker stop todo-web-app
rmi:
	docker rmi givneyt/todo-web-app
push:
	docker push givneyt/todo-web-app
