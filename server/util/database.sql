/* table identity(phương thức đăng nhập) */
CREATE TABLE IF NOT EXISTS `identity`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NULL UNIQUE,
    `hash` VARCHAR(255) NOT NULL,
    `method` VARCHAR(255) NOT NULL,
    `create_at` DATETIME NOT NULL DEFAULT NOW(),
    `update_at` DATETIME NOT NULL DEFAULT NOW()
);
/* table users(người dùng) */
CREATE TABLE IF NOT EXISTS `users`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `identity_id` INT(11) NOT NULL,
    `fullname` VARCHAR(255),
    `avatar` VARCHAR(500),
    `information` VARCHAR(500),
    `coins` BIGINT DEFAULT 0,
    `level` INT(99) DEFAULT 1,
    `exp` INT(99) DEFAULT 0,
    `check_in` BOOLEAN DEFAULT False,
    `create_at` DATETIME NOT NULL DEFAULT NOW(),
    `update_at` DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (`identity_id`) REFERENCES `identity`(`id`) ON DELETE CASCADE
);

/* table comment(bình luận) */
CREATE TABLE IF NOT EXISTS `comment`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `post_id` INT(11) NOT NULL,
    `user_id` INT(11) NOT NULL,
    `content` VARCHAR(255),
    `like` INT DEFAULT 0,
    `dislike` INT DEFAULT 0,
    `create_at` DATETIME NOT NULL DEFAULT NOW(),
    `update_at` DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ,
    FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE
);
/* table images(hình ảnh) */
CREATE TABLE IF NOT EXISTS `images`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `post_id` INT(11) NOT NULL,
    `image_url` VARCHAR(255),
    FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE
);
/* table videos(video) */
CREATE TABLE IF NOT EXISTS `videos`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `post_id` INT(11) NOT NULL,
    `video_url` VARCHAR(255),
    FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE
);
    /* table post(bài đăng) */
CREATE TABLE IF NOT EXISTS `post`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT(11) NOT NULL,
    `title` VARCHAR(255),
    `content` TEXT,
    `hashtag` VARCHAR(255),
    `rating` INT(11) NOT NULL,
    `view_count` INT DEFAULT 0,
    `location_id` INT,
    `create_at` DATETIME NOT NULL DEFAULT NOW(),
    `update_at` DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE CASCADE
    );
    /* table follower(theo dõi) */
    CREATE TABLE IF NOT EXISTS `follower`(
        `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `user_id` INT(11) NOT NULL,
        `follower_id` INT(11) NOT NULL,
        FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
        FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
    );
/* table post_save(bài đã lưu) */
CREATE TABLE IF NOT EXISTS `posts_save`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT(11) NOT NULL,
    `post_id` INT(11) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE
);
/* table mission(nhiệm vụ) */
CREATE TABLE IF NOT EXISTS `mission`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NULL UNIQUE,
    `content` VARCHAR(255) NOT NULL,
    `maximum_progress` INT(99) DEFAULT 0,
    `coins` BIGINT DEFAULT 0,
    `exp` INT(99) DEFAULT 0,
    `create_at` DATETIME NOT NULL DEFAULT NOW(),
    `update_at` DATETIME NOT NULL DEFAULT NOW()
);
/* table status_misson(trạng thái nhiệm vụ) */
CREATE TABLE IF NOT EXISTS `status_mission`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT(11) NOT NULL,
    `mission_id` INT(11) NOT NULL,
    `rate_of_progress` INT(99) DEFAULT 0,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE CASCADE
);

/* table locations(địa điểm) */
CREATE TABLE IF NOT EXISTS `locations`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(12),
    `opening_hours` VARCHAR(50),
    `rating` DECIMAL(2,1)
);

CREATE TABLE IF NOT EXISTS `resetPassword`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `identity_id` INT(11) NOT NULL,
    `code` VARCHAR (255) NOT NULL,
    `status` BOOLEAN DEFAULT TRUE
    FOREIGN KEY (`identity_id`) REFERENCES `identity`(`id`)
)

CREATE TABLE IF NOT EXISTS `voucher_store`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255),
    `detail` TEXT,
    `amount` BIGINT ,
    `id` INT(99),
    `code `VARCHAR(255),
    `expiry_date` DATETIME.
    `store_image `VARCHAR(255),
    `voucher_image `VARCHAR(255),
    `create_at` DATETIME NOT NULL DEFAULT NOW(),
    `update_at` DATETIME NOT NULL DEFAULT NOW(),
);

CREATE TABLE IF NOT EXISTS `posts_report`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `post_id` INT(11) NOT NULL,
    `user_id` INT(11) NOT NULL,
    `content` VARCHAR(255),
    `cause` VARCHAR(255),
    `status` BOOLEAN DEFAULT 0,
    `create_at` DATETIME NOT NULL DEFAULT NOW(),
    `update_at` DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ,
    FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS `voucher_wallet`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `voucher_id` INT(11) NOT NULL,
    `user_id` INT(11) NOT NULL,
    `status` BOOLEAN DEFAULT 0,
    `create_at` DATETIME NOT NULL DEFAULT NOW(),
    `update_at` DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ,
    FOREIGN KEY (`voucher_id`) REFERENCES `voucher_store`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `devices`(
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT(11) NOT NULL,
    `devices_token` TEXT,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE 
);