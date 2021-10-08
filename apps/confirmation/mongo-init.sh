set -e

mongo <<EOF
db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD')

db = db.getSiblingDB('admin')

db.createUser({
  user: '$MONGO_INITDB_USER',
  pwd: '$MONGO_INITDB_PWD',
  roles: [
    {
      role: 'readWrite',
      db: '$MONGO_INITDB_DATABASE',
    },
  ],
});