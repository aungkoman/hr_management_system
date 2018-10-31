-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2018 at 11:33 AM
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
-- Table structure for table `soldiers`
--

CREATE TABLE `soldiers` (
  `id` int(11) NOT NULL,
  `mc_type` int(11) DEFAULT NULL,
  `mc` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
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
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `soldiers`
--

INSERT INTO `soldiers` (`id`, `mc_type`, `mc`, `rank`, `name`, `position`, `company`, `current_location`, `inner_location`, `inner_duty`, `ops_location`, `ops_duty`, `outside_location`, `outside_duty_name`, `outside_duty_location`, `outside_duty_start_date`, `outside_duty_end_date`, `created_date`, `last_modified_date_time`) VALUES
(48, 0, 7854, 0, 'yu', 0, 0, 0, 0, 0, 0, 0, 0, 'null', 'null', NULL, NULL, NULL, NULL),
(49, 0, 85464, 0, 'ui', 0, 0, 0, 0, 0, 0, 0, 0, 'null', 'null', NULL, NULL, NULL, NULL),
(37, 1, 63441, 5, 'Aung Ko Man', 3, 1, 3, 0, 0, 0, 0, 1, 'MSCs', 'POL', '2018-10-03', '2018-10-31', NULL, NULL),
(38, 1, 256, 7, 'EW', 11, 5, 2, 0, 0, 5, 5, 0, 'null', 'null', 'null', 'null', NULL, NULL),
(39, 1, 25, 6, 'a', 0, 0, 2, 0, 0, 5, 4, 0, 'null', 'null', 'null', 'null', NULL, NULL),
(40, 2, 234, 7, 'we', 0, 0, 0, 0, 0, 0, 0, 0, 'null', 'null', NULL, NULL, NULL, NULL),
(41, 1, 4567, 7, 'ui', 4, 3, 2, 0, 0, 5, 4, 0, 'null', 'null', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `soldiers`
--
ALTER TABLE `soldiers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mc` (`mc`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `soldiers`
--
ALTER TABLE `soldiers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
