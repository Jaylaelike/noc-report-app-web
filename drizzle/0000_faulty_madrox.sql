CREATE TABLE `ccemailsettings` (
	`id_cc` bigint AUTO_INCREMENT NOT NULL,
	`enterprise_cc` varchar(255) NOT NULL,
	`username_cc` varchar(255) NOT NULL,
	`telphone_cc` varchar(255) NOT NULL,
	`emails_cc` varchar(255) NOT NULL,
	CONSTRAINT `ccemailsettings_id_cc` PRIMARY KEY(`id_cc`),
	CONSTRAINT `ccemailsettings_username_cc_unique` UNIQUE(`username_cc`)
);
--> statement-breakpoint
CREATE TABLE `emailsettings` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`enterprise` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`telphone` varchar(255) NOT NULL,
	`emails` varchar(255) NOT NULL,
	CONSTRAINT `emailsettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `emailsettings_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `image` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`url` varchar(1024) NOT NULL,
	`userId` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp,
	CONSTRAINT `image_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maindbs` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`Site` varchar(255) NOT NULL,
	`FacilityProvider` varchar(255) NOT NULL,
	`EngineeringCenter` varchar(255) NOT NULL,
	`PostingDate` datetime NOT NULL,
	`DowntimeStart` datetime NOT NULL,
	`DowntimeEnd` datetime NOT NULL,
	`DowntimeTotal` varchar(255) NOT NULL,
	`Detail` varchar(255) NOT NULL,
	`JobTickets` varchar(255) NOT NULL,
	`Reporter` varchar(255) NOT NULL,
	`Approver` varchar(255) NOT NULL,
	`Remark` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` datetime,
	CONSTRAINT `maindbs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reporters` (
	`id_reporter` bigint AUTO_INCREMENT NOT NULL,
	`username_reporter` varchar(255) NOT NULL,
	CONSTRAINT `reporters_id_reporter` PRIMARY KEY(`id_reporter`),
	CONSTRAINT `reporters_username_reporter_unique` UNIQUE(`username_reporter`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`role` varchar(255) NOT NULL DEFAULT 'user',
	`hashed_password` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `image` ADD CONSTRAINT `image_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `name_idx` ON `image` (`name`);