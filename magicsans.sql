-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2020 at 03:19 AM
-- Server version: 8.0.20
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `magicsans`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int NOT NULL,
  `address1` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `address2` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `zip` varchar(11) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `fk_users` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `address1`, `address2`, `country`, `city`, `state`, `zip`, `fk_users`) VALUES
(1, 'catsun', 'conbuebito', 'mx', 'CDMX', 'ebrio', '12345', 2);

-- --------------------------------------------------------

--
-- Table structure for table `attractions`
--

CREATE TABLE `attractions` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `id` int NOT NULL,
  `adults` int DEFAULT NULL,
  `children` int DEFAULT NULL,
  `fk_users` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `attractions`
--

INSERT INTO `attractions` (`name`, `id`, `adults`, `children`, `fk_users`) VALUES
('Zombie World', 5, 2, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `attractionsdet`
--

CREATE TABLE `attractionsdet` (
  `id` int NOT NULL,
  `attraction` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `park_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `attractionsdet`
--

INSERT INTO `attractionsdet` (`id`, `attraction`, `park_id`) VALUES
(1, 'Zombie World', 1),
(2, 'Great LEGO Race', 2),
(3, 'Silverwood Coaster', 3),
(4, 'The hunters road', 4),
(5, 'Dumbooo', 5);

-- --------------------------------------------------------

--
-- Table structure for table `parkdet`
--

CREATE TABLE `parkdet` (
  `id` int NOT NULL,
  `park` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `parkdet`
--

INSERT INTO `parkdet` (`id`, `park`) VALUES
(1, 'Fableworld'),
(2, 'Herorealm'),
(3, 'Emberpark'),
(4, 'Floweyland'),
(5, 'Dreamland');

-- --------------------------------------------------------

--
-- Table structure for table `parks`
--

CREATE TABLE `parks` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `adults` int DEFAULT NULL,
  `children` int DEFAULT NULL,
  `fk_users` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `parks`
--

INSERT INTO `parks` (`id`, `name`, `check_in`, `check_out`, `adults`, `children`, `fk_users`) VALUES
(1, 'Fableworld', '2020-06-02', '2020-06-05', 1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`) VALUES
(21, 'jassiel98@gmail.com', '502afdbfa51c896653b15788285f9783358e02d589210e155c7cde2031389de65f089212008df2fd81754e6bca554c09b8fc'),
(22, 'jassiel98@gmail.com', '5b733db77014fdbf146c440f0b55b6fd6fa140b457f1314670f420bd8d1176908389db029cf962bf0948c33d4c30342d52b1');

-- --------------------------------------------------------

--
-- Table structure for table `personal-info`
--

CREATE TABLE `personal-info` (
  `first-name` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `middle-name` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `last-name` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `id` int NOT NULL,
  `foreign-key` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `personal-info`
--

INSERT INTO `personal-info` (`first-name`, `middle-name`, `last-name`, `age`, `gender`, `phone`, `email`, `id`, `foreign-key`) VALUES
('Yoltic Jassiel', 'Garcia', 'Guzman', 21, 'male', '55 6961 2342', 'jassiel98@gmail.com', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `transaction_id` int NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `fk_users` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `name`, `transaction_id`, `created`, `fk_users`) VALUES
(1, 'test', 0, '2020-06-03 14:41:12', 2),
(4, 'shows', 3, '2020-06-03 18:30:08', 2);

-- --------------------------------------------------------

--
-- Table structure for table `shows`
--

CREATE TABLE `shows` (
  `id` int NOT NULL,
  `day` date NOT NULL,
  `schedule` time NOT NULL,
  `adults` int DEFAULT NULL,
  `children` int DEFAULT NULL,
  `fk_users` int NOT NULL,
  `showname` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `shows`
--

INSERT INTO `shows` (`id`, `day`, `schedule`, `adults`, `children`, `fk_users`, `showname`) VALUES
(1, '2020-06-06', '16:28:21', 2, 3, 2, 'Franco escamilla xd'),
(2, '2020-06-04', '17:00:00', 3, 2, 2, 'Deadpool dancing \"I\'m a cat!\"'),
(3, '2020-06-13', '15:00:00', 3, 0, 2, 'Carlos Vallarta');

-- --------------------------------------------------------

--
-- Table structure for table `showsdet`
--

CREATE TABLE `showsdet` (
  `id` int NOT NULL,
  `showname` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `park_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `showsdet`
--

INSERT INTO `showsdet` (`id`, `showname`, `park_id`) VALUES
(1, 'Franco Escamilla en vivo', 1),
(2, 'Carlos Vallarta', 2),
(3, 'Glados and the neurotoxins', 3),
(4, 'Deadpool dancing \"I\'m a cat!\"', 4),
(5, 'Lelouch the resurrection', 5);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_token_auth`
--

CREATE TABLE `tbl_token_auth` (
  `id` int NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `selector_hash` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `is_expired` int NOT NULL DEFAULT '0',
  `expiry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `tbl_token_auth`
--

INSERT INTO `tbl_token_auth` (`id`, `username`, `password_hash`, `selector_hash`, `is_expired`, `expiry_date`) VALUES
(1, 'aaa', '$2y$10$JuwLZPziNR.fB.WJx/V7bO9DfmARM/S/ZU10JLxjD53hZkhBmw9PK', '$2y$10$zH6AyDhLGBwp0/Zgsp4MAOmL1ULhfCoDwnbHBSWkwM49qwB88ikH6', 1, '2020-06-24 02:09:18'),
(2, 'aaa', '$2y$10$q2bO6F0O.anmjqJdC9kigehzdF5s3j5vnx/EHpUvxotl5pYg0ff4m', '$2y$10$Z2hDnudot.JuorgeS3c/yekpaPZuJF4OUQU3dLHKL86Xl2EQ/j4dS', 1, '2020-06-24 02:15:34'),
(3, 'aaa', '$2y$10$xY72iExu2rJF8tuJuPIV6uYwOTludgB49x0MoyugfIi9velD7edOW', '$2y$10$RT7gHaNNSxSHAamqBcdT5OhX3TDpLizgBAl0IEoswy0NMrgSErsum', 0, '2020-06-26 10:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE `tours` (
  `id` int NOT NULL,
  `destination` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `day` date NOT NULL,
  `departure` time NOT NULL,
  `adults` int DEFAULT NULL,
  `children` int DEFAULT NULL,
  `fk_users` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`id`, `destination`, `day`, `departure`, `adults`, `children`, `fk_users`) VALUES
(1, 'Scotland, UK', '2020-06-02', '17:00:00', 2, 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `toursdet`
--

CREATE TABLE `toursdet` (
  `id` int NOT NULL,
  `destination` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `toursdet`
--

INSERT INTO `toursdet` (`id`, `destination`) VALUES
(1, 'New Jersey, USA'),
(2, 'Berlin, Germany'),
(3, 'Scotland, UK'),
(4, 'Mexico City, Mexico');

-- --------------------------------------------------------

--
-- Table structure for table `transport`
--

CREATE TABLE `transport` (
  `id` int NOT NULL,
  `transport` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `departure` datetime NOT NULL,
  `arrival` datetime NOT NULL,
  `adults` int DEFAULT NULL,
  `children` int DEFAULT NULL,
  `fk_users` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `transport`
--

INSERT INTO `transport` (`id`, `transport`, `departure`, `arrival`, `adults`, `children`, `fk_users`) VALUES
(1, 'Train', '2020-06-03 14:23:00', '2020-06-03 18:30:00', 3, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `transportdet`
--

CREATE TABLE `transportdet` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `capacity` int NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `transportdet`
--

INSERT INTO `transportdet` (`id`, `name`, `capacity`, `price`) VALUES
(1, 'Airplane', 50, 100),
(2, 'Bus', 45, 45),
(3, 'Train', 365, 30),
(4, 'Ship', 40, 26),
(5, 'Car', 4, 20);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `created_at`) VALUES
(1, 'hola', '$2y$10$2vX7t4UHtrdGHZufIj9n7e7o8OxMNLnVEInywXTABeCca878nlub2', NULL, '2020-05-23 14:48:33'),
(2, 'aaa', '$2y$10$sB5zMmD6wILVkiq.MhIZZu5qf/mmsSPgxHgn2baF7C5RXsZbHxtA6', 'jassiel98@gmail.com', '2020-05-23 16:25:06'),
(3, 'test', '$2y$10$yO4rMv244EULTRan3RZSE.3bTRgwj27rSSRsw4jEvjjYBWApOnvpa', 'test@test.com', '2020-05-24 12:16:17'),
(4, 'RAWWR', '$2y$10$jziihLc1OUKWQIf7li9AG.m3rsCAlvOHZ8h82ORYDeUD7N9BP5gVe', 'misayagami98@gmail.com', '2020-05-24 19:22:11'),
(5, 'Maro', '$2y$10$4e70h7J6rlEVXQWaieBTBufwUf6.P5ktMbOUOXymo6OQVyeh//SzS', 'sdgvagea@szgva.com', '2020-05-29 14:11:16'),
(6, 'Prueba1', '$2y$10$6JQqDu0gR0HeMOvs3NUSxO6CyjcAeIErv2ioXGR1n4QKx2uCrMGRq', 'prueba1@gmail.com', '2020-05-29 16:28:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`fk_users`) USING BTREE;

--
-- Indexes for table `attractions`
--
ALTER TABLE `attractions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users` (`fk_users`) USING BTREE;

--
-- Indexes for table `attractionsdet`
--
ALTER TABLE `attractionsdet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `park_id` (`park_id`);

--
-- Indexes for table `parkdet`
--
ALTER TABLE `parkdet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parks`
--
ALTER TABLE `parks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users` (`fk_users`) USING BTREE;

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `personal-info`
--
ALTER TABLE `personal-info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `foreign-key` (`foreign-key`) USING BTREE;

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users` (`fk_users`);

--
-- Indexes for table `shows`
--
ALTER TABLE `shows`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users` (`fk_users`) USING BTREE;

--
-- Indexes for table `showsdet`
--
ALTER TABLE `showsdet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `park_id` (`park_id`);

--
-- Indexes for table `tbl_token_auth`
--
ALTER TABLE `tbl_token_auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users` (`fk_users`) USING BTREE;

--
-- Indexes for table `toursdet`
--
ALTER TABLE `toursdet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transport`
--
ALTER TABLE `transport`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users` (`fk_users`);

--
-- Indexes for table `transportdet`
--
ALTER TABLE `transportdet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `attractions`
--
ALTER TABLE `attractions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `attractionsdet`
--
ALTER TABLE `attractionsdet`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `parkdet`
--
ALTER TABLE `parkdet`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `parks`
--
ALTER TABLE `parks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `personal-info`
--
ALTER TABLE `personal-info`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `shows`
--
ALTER TABLE `shows`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `showsdet`
--
ALTER TABLE `showsdet`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_token_auth`
--
ALTER TABLE `tbl_token_auth`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tours`
--
ALTER TABLE `tours`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `toursdet`
--
ALTER TABLE `toursdet`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transport`
--
ALTER TABLE `transport`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transportdet`
--
ALTER TABLE `transportdet`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`fk_users`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attractions`
--
ALTER TABLE `attractions`
  ADD CONSTRAINT `attractions_ibfk_1` FOREIGN KEY (`fk_users`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attractionsdet`
--
ALTER TABLE `attractionsdet`
  ADD CONSTRAINT `attractionsdet_ibfk_1` FOREIGN KEY (`park_id`) REFERENCES `parkdet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `parks`
--
ALTER TABLE `parks`
  ADD CONSTRAINT `parks_ibfk_1` FOREIGN KEY (`fk_users`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `personal-info`
--
ALTER TABLE `personal-info`
  ADD CONSTRAINT `personal-info_ibfk_1` FOREIGN KEY (`foreign-key`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`fk_users`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shows`
--
ALTER TABLE `shows`
  ADD CONSTRAINT `shows_ibfk_1` FOREIGN KEY (`fk_users`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `showsdet`
--
ALTER TABLE `showsdet`
  ADD CONSTRAINT `showsdet_ibfk_1` FOREIGN KEY (`park_id`) REFERENCES `parkdet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tours`
--
ALTER TABLE `tours`
  ADD CONSTRAINT `tours_ibfk_1` FOREIGN KEY (`fk_users`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transport`
--
ALTER TABLE `transport`
  ADD CONSTRAINT `transport_ibfk_1` FOREIGN KEY (`fk_users`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
