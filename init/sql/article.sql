CREATE TABLE  IF NOT EXISTS `article` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`article_title` varchar(255) DEFAULT NULL,
	`article_content` varchar(255) DEFAULT NULL,
	`autor` varchar(255) DEFAULT NULL,
	`create_time` datetime DEFAULT CURRENT_TIMESTAMP,
	`modified_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`article_text` longtext DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8