CREATE TABLE at_usuarios( 
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(150) DEFAULT NULL,
  email varchar(250) DEFAULT NULL,
  pass varchar(250) DEFAULT NULL,
  rol int(2) DEFAULT NULL,
  status int(1) DEFAULT '1',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
