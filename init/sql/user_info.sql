CREATE TABLE   IF NOT EXISTS  `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nick` varchar(255) DEFAULT NULL,
  `brithday` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `detail_info` longtext DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `anything` longtext DEFAULT null,
  `level` int(11) DEFAULT 1,
  `follow` int(11) DEFAULT 0,
  `access` int(11) DEFAULT 0,
  `identified` int(11) DEFAULT 1,
  'avatar_path' varchar(255) DEFAULT NULL,
  'sex' int(3) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
