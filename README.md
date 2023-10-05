# nodejs dummy
## Usage

```bash
npm install
```

```MySQL
CREATE DATABASE dummy;
use dummy;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password) VALUES ('admin', 'admin');
INSERT INTO users (username, password) VALUES ('guest', 'guest');
```
