# PJM
mvn clean compile -Djetty.port=8083 jetty:run

#JUnit Test
mvn clean compile -Dspring.profiles.active=test-derby -Dtest=TypeTaskTest test

-XX:MaxPermSize=512M


mvn clean compile package -Dmaven.test.skip=true -P deploy-k-local