CHANGE REPLICATION SOURCE TO
  SOURCE_HOST='main-db-write',
  SOURCE_PORT=3306,
  SOURCE_USER='root',
  SOURCE_PASSWORD='root',
  SOURCE_AUTO_POSITION=1,
  GET_SOURCE_PUBLIC_KEY=1;

STOP REPLICA;
START REPLICA;
