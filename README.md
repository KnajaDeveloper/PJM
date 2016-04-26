# PJM
mvn clean compile -Djetty.port=8083 jetty:run

#JUnit Test
mvn clean compile -Dspring.profiles.active=test-derby -Dtest=TypeTaskTest test

-XX:MaxPermSize=512M