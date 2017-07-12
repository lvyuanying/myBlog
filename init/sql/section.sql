CREATE TABLE  IF NOT EXISTS `section` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) DEFAULT NULL,
	`detail_info` varchar(255) DEFAULT NULL,
	PRIMARY KEY(`id`)
)	ENGINE=InnoDB DEFAULT CHARSET=utf8;
