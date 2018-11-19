-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2018 at 02:43 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hr_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`) VALUES
(1, 'Head Quarter'),
(2, 'Company 1'),
(3, 'Company 2'),
(4, 'Company 3'),
(5, 'Company 4');

-- --------------------------------------------------------

--
-- Table structure for table `current_location`
--

CREATE TABLE `current_location` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `current_location`
--

INSERT INTO `current_location` (`id`, `name`) VALUES
(1, 'inner'),
(2, 'outside'),
(3, 'ops');

-- --------------------------------------------------------

--
-- Table structure for table `inner_duty`
--

CREATE TABLE `inner_duty` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inner_duty`
--

INSERT INTO `inner_duty` (`id`, `name`) VALUES
(1, 'CO'),
(2, '2IC'),
(3, 'Head  Master'),
(4, 'Yay Capt'),
(5, 'Q Capt'),
(6, 'IO'),
(7, 'CC'),
(8, 'PC'),
(9, 'C WO@'),
(10, 'C CQ'),
(11, 'C Seg'),
(12, 'C Salary Cop'),
(13, 'C RM');

-- --------------------------------------------------------

--
-- Table structure for table `inner_location`
--

CREATE TABLE `inner_location` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inner_location`
--

INSERT INTO `inner_location` (`id`, `name`) VALUES
(1, 'Head Quarter'),
(2, 'Company 1'),
(3, 'Company 2'),
(4, 'Company 3'),
(5, 'Company 4');

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `soldiers_id` int(11) DEFAULT NULL,
  `current_location` int(11) DEFAULT NULL,
  `inner_location` int(11) DEFAULT NULL,
  `inner_duty` int(11) DEFAULT NULL,
  `ops_location` int(11) DEFAULT NULL,
  `ops_duty` int(11) DEFAULT NULL,
  `outside_location` int(11) DEFAULT NULL,
  `outside_duty_name` text COLLATE utf8_bin,
  `outside_duty_location` text COLLATE utf8_bin,
  `start_date` text COLLATE utf8_bin,
  `end_date` text COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `mc_type`
--

CREATE TABLE `mc_type` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mc_type`
--

INSERT INTO `mc_type` (`id`, `name`) VALUES
(1, 'MC'),
(2, 'KP'),
(3, 'TP');

-- --------------------------------------------------------

--
-- Table structure for table `operations`
--

CREATE TABLE `operations` (
  `id` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `start_date` text COLLATE utf8_bin,
  `emd_date` text COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `ops_duty`
--

CREATE TABLE `ops_duty` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ops_duty`
--

INSERT INTO `ops_duty` (`id`, `name`) VALUES
(1, 'SKM'),
(2, 'CC'),
(3, 'PC'),
(4, 'TC'),
(5, 'RM');

-- --------------------------------------------------------

--
-- Table structure for table `ops_location`
--

CREATE TABLE `ops_location` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ops_location`
--

INSERT INTO `ops_location` (`id`, `name`) VALUES
(1, 'BKH Camp'),
(2, 'BKH Momement'),
(3, 'TTT Camp'),
(4, 'TTT Movement'),
(5, 'TZ Camp'),
(6, 'TZ Movement');

-- --------------------------------------------------------

--
-- Table structure for table `outside_location`
--

CREATE TABLE `outside_location` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `outside_location`
--

INSERT INTO `outside_location` (`id`, `name`) VALUES
(1, 'Course'),
(2, 'On Leave'),
(3, 'Hospital'),
(4, 'Absent Without Leave'),
(5, 'T Duty');

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`id`, `name`) VALUES
(1, 'CO'),
(2, '2IC'),
(3, 'Head  Master'),
(4, 'Yay Capt'),
(5, 'Q Capt'),
(6, 'IO'),
(7, 'CC'),
(8, 'PC'),
(9, 'C WO2'),
(10, 'C CQ'),
(11, 'C Seg'),
(12, 'C Salary Cop'),
(13, 'C RM');

-- --------------------------------------------------------

--
-- Table structure for table `rank`
--

CREATE TABLE `rank` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rank`
--

INSERT INTO `rank` (`id`, `name`) VALUES
(1, 'Lt Col'),
(2, 'Lt Col/Maj'),
(3, 'Maj'),
(4, 'Maj/Capt'),
(5, 'Capt'),
(6, 'Lt.'),
(7, 'Second Lt.'),
(8, 'WO'),
(9, 'WO 2'),
(10, 'CQ'),
(11, 'Seg'),
(12, 'Cop'),
(13, 'Second Cop'),
(14, 'RM');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'User'),
(3, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `soldiers`
--

CREATE TABLE `soldiers` (
  `db_id` int(11) NOT NULL,
  `mc_type` int(11) DEFAULT NULL,
  `mc` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `company` int(11) DEFAULT NULL,
  `current_location` int(11) DEFAULT NULL,
  `inner_location` int(11) DEFAULT NULL,
  `inner_duty` int(11) DEFAULT NULL,
  `ops_location` int(11) DEFAULT NULL,
  `ops_duty` int(11) DEFAULT NULL,
  `outside_location` int(11) DEFAULT NULL,
  `outside_duty_name` text,
  `outside_duty_location` text,
  `outside_duty_start_date` text,
  `outside_duty_end_date` text,
  `created_date` text,
  `last_modified_date_time` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `soldiers`
--

INSERT INTO `soldiers` (`db_id`, `mc_type`, `mc`, `rank`, `name`, `position`, `company`, `current_location`, `inner_location`, `inner_duty`, `ops_location`, `ops_duty`, `outside_location`, `outside_duty_name`, `outside_duty_location`, `outside_duty_start_date`, `outside_duty_end_date`, `created_date`, `last_modified_date_time`) VALUES
(2, 1, 123, 1, 'Test Name', 1, 1, 1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 1, 453, 2, ' tr', 1, 1, 1, 3, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 2, 442, 7, ' 657', 2, 5, 2, NULL, NULL, 6, 3, NULL, 'null', 'null', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `mc` int(11) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` int(11) NOT NULL,
  `created_date` text NOT NULL,
  `modified_date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `mc`, `password`, `role`, `created_date`, `modified_date`) VALUES
(1, 123, '123', 1, '', ''),
(3, 456, '456', 0, '', ''),
(4, 63441, '63441', 2, '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `current_location`
--
ALTER TABLE `current_location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inner_duty`
--
ALTER TABLE `inner_duty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inner_location`
--
ALTER TABLE `inner_location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `soldiers_id` (`soldiers_id`),
  ADD KEY `current_location` (`current_location`),
  ADD KEY `inner_location` (`inner_location`),
  ADD KEY `inner_duty` (`inner_duty`),
  ADD KEY `ops_location` (`ops_location`),
  ADD KEY `ops_duty` (`ops_duty`),
  ADD KEY `outside_location` (`outside_location`);

--
-- Indexes for table `mc_type`
--
ALTER TABLE `mc_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `name_2` (`name`);

--
-- Indexes for table `ops_duty`
--
ALTER TABLE `ops_duty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ops_location`
--
ALTER TABLE `ops_location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `outside_location`
--
ALTER TABLE `outside_location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rank`
--
ALTER TABLE `rank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `soldiers`
--
ALTER TABLE `soldiers`
  ADD PRIMARY KEY (`db_id`),
  ADD UNIQUE KEY `mc` (`mc`),
  ADD KEY `mc_2` (`mc`),
  ADD KEY `rank` (`rank`),
  ADD KEY `current_location` (`current_location`),
  ADD KEY `mc_type` (`mc_type`),
  ADD KEY `rank_2` (`rank`),
  ADD KEY `position` (`position`),
  ADD KEY `company` (`company`),
  ADD KEY `inner_location` (`inner_location`),
  ADD KEY `inner_duty` (`inner_duty`),
  ADD KEY `mc_type_2` (`mc_type`),
  ADD KEY `ops_location` (`ops_location`),
  ADD KEY `outside_location` (`outside_location`),
  ADD KEY `ops_duty` (`ops_duty`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mc` (`mc`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `current_location`
--
ALTER TABLE `current_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `inner_duty`
--
ALTER TABLE `inner_duty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `inner_location`
--
ALTER TABLE `inner_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `mc_type`
--
ALTER TABLE `mc_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `operations`
--
ALTER TABLE `operations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ops_duty`
--
ALTER TABLE `ops_duty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `ops_location`
--
ALTER TABLE `ops_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `outside_location`
--
ALTER TABLE `outside_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `rank`
--
ALTER TABLE `rank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `soldiers`
--
ALTER TABLE `soldiers`
  MODIFY `db_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `log_ibfk_1` FOREIGN KEY (`soldiers_id`) REFERENCES `soldiers` (`db_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `log_ibfk_2` FOREIGN KEY (`ops_duty`) REFERENCES `ops_duty` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `log_ibfk_3` FOREIGN KEY (`current_location`) REFERENCES `current_location` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `log_ibfk_4` FOREIGN KEY (`ops_location`) REFERENCES `ops_location` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `log_ibfk_5` FOREIGN KEY (`inner_location`) REFERENCES `inner_location` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `log_ibfk_6` FOREIGN KEY (`inner_duty`) REFERENCES `inner_duty` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `soldiers`
--
ALTER TABLE `soldiers`
  ADD CONSTRAINT `soldiers_ibfk_1` FOREIGN KEY (`current_location`) REFERENCES `current_location` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `soldiers_ibfk_10` FOREIGN KEY (`ops_duty`) REFERENCES `ops_duty` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `soldiers_ibfk_2` FOREIGN KEY (`rank`) REFERENCES `rank` (`id`),
  ADD CONSTRAINT `soldiers_ibfk_3` FOREIGN KEY (`mc_type`) REFERENCES `mc_type` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `soldiers_ibfk_4` FOREIGN KEY (`position`) REFERENCES `position` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `soldiers_ibfk_5` FOREIGN KEY (`inner_location`) REFERENCES `inner_location` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `soldiers_ibfk_6` FOREIGN KEY (`inner_duty`) REFERENCES `inner_duty` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `soldiers_ibfk_7` FOREIGN KEY (`outside_location`) REFERENCES `outside_location` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `soldiers_ibfk_8` FOREIGN KEY (`ops_location`) REFERENCES `ops_location` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `soldiers_ibfk_9` FOREIGN KEY (`company`) REFERENCES `company` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
