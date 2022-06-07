-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 07, 2022 at 06:58 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ijgames`
--

-- --------------------------------------------------------

--
-- Table structure for table `ADMIN`
--

CREATE TABLE `ADMIN` (
  `ADMIN_ID` int(11) NOT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ADMIN`
--

INSERT INTO `ADMIN` (`ADMIN_ID`, `NAME`, `EMAIL`, `PASSWORD`) VALUES
(2, 'admin', 'admin@gmail.com', '$2b$10$I0tnB6UCUqbQUKImN5rlk.X.qMqt9lEdSiTHhSLXflyN6bVMtONae');

-- --------------------------------------------------------

--
-- Table structure for table `GAME`
--

CREATE TABLE `GAME` (
  `GAME_ID` int(11) NOT NULL,
  `NAME` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `GAME`
--

INSERT INTO `GAME` (`GAME_ID`, `NAME`) VALUES
(1, 'PUBG'),
(2, 'VALORANT'),
(3, 'FREEFIRE'),
(4, 'CALL OF DUTY'),
(5, 'DOTA 2'),
(6, 'APEX LEGENDS');

-- --------------------------------------------------------

--
-- Table structure for table `ORGANIZER`
--

CREATE TABLE `ORGANIZER` (
  `ORGANIZER_ID` int(11) NOT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ORGANIZER`
--

INSERT INTO `ORGANIZER` (`ORGANIZER_ID`, `NAME`, `EMAIL`, `PASSWORD`) VALUES
(1, 'Gamer.LK', 'gamerlk@gmail.com', '$2b$08$vQQWkTQHX4MS3pPomz8cju7q0JOrEMpQ26e5ymiz75xU7AsVOMDxe'),
(2, 'Codashop', 'codashop@gmail.com', '$2b$08$vQQWkTQHX4MS3pPomz8cju7q0JOrEMpQ26e5ymiz75xU7AsVOMDxe'),
(3, 'GN United', 'gnunited@gmail.com', '$2b$08$vQQWkTQHX4MS3pPomz8cju7q0JOrEMpQ26e5ymiz75xU7AsVOMDxe'),
(4, 'RAW Esports', 'rawesports@gmail.com', '$2b$08$vQQWkTQHX4MS3pPomz8cju7q0JOrEMpQ26e5ymiz75xU7AsVOMDxe'),
(5, 'Apex Esports', 'apex@gmail.com', '$2b$08$vQQWkTQHX4MS3pPomz8cju7q0JOrEMpQ26e5ymiz75xU7AsVOMDxe'),
(6, 'ADLORD gaming', 'adlord@gmail.com', '$2b$08$vQQWkTQHX4MS3pPomz8cju7q0JOrEMpQ26e5ymiz75xU7AsVOMDxe');

-- --------------------------------------------------------

--
-- Table structure for table `ORGANIZER_REQUEST`
--

CREATE TABLE `ORGANIZER_REQUEST` (
  `REQUEST_ID` int(11) NOT NULL,
  `NAME` varchar(100) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `STATUS` tinyint(4) DEFAULT 0,
  `PROOF` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ORGANIZER_REQUEST`
--

INSERT INTO `ORGANIZER_REQUEST` (`REQUEST_ID`, `NAME`, `EMAIL`, `STATUS`, `PROOF`, `PASSWORD`) VALUES
(1, 'Organizer_jathu', 'physickness@gmail.com', 0, 'proof1', NULL),
(2, 'organizer_mathu', 'mathu@gmail.com', 0, 'proof', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `PLAYER`
--

CREATE TABLE `PLAYER` (
  `PLAYER_ID` int(11) NOT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(255) DEFAULT NULL,
  `GENDER` tinyint(4) DEFAULT 0,
  `DOB` datetime DEFAULT NULL,
  `COUNTRY` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PLAYER`
--

INSERT INTO `PLAYER` (`PLAYER_ID`, `NAME`, `EMAIL`, `PASSWORD`, `GENDER`, `DOB`, `COUNTRY`) VALUES
(2, 'jathu', 'jathu@gmail.com', '$2b$08$vQQWkTQHX4MS3pPomz8cju7q0JOrEMpQ26e5ymiz75xU7AsVOMDxe', 1, '2022-05-04 21:53:26', 'SRI LANKA'),
(3, 'ajith', 'ajith@gmail.com', '$2b$08$vQQWkTQHX4MS3pPomz8cju7q0JOrEMpQ26e5ymiz75xU7AsVOMDxe', 1, '2022-05-17 17:58:22', 'Sri Lanka'),
(4, 'math', 'mathu@gmail.com', '$2b$08$vQQWkTQHX4MS3pPomz8cju7q0JOrEMpQ26e5ymiz75xU7AsVOMDxe', 0, '2022-05-28 07:35:41', 'United Kingdom'),
(5, 'player_test', 'player_test@gmail.com', '$2b$08$xrLycl0Q..yfFk15Gi6grezw7Y/JpY1T5PEGkW4z9Kg9iwFdPTNrS', 0, '2022-05-11 00:00:00', 'Sri Lanka'),
(6, 'test_1', 'test_1@gmail.com', '$2b$08$vQQWkTQHX4MS3pPomz8cju7q0JOrEMpQ26e5ymiz75xU7AsVOMDxe', 0, '2022-04-01 00:00:00', 'Sri Lanka'),
(7, 'test_2', 'test_2@gmail.com', '$2b$08$KucRKkWL8N7KB0CibTHgaOA2h93TkHO7bjEHiANhj5UBpoOYgoBRS', 0, '2022-07-09 00:00:00', 'Sri Lanka');

-- --------------------------------------------------------

--
-- Table structure for table `PLAYER_TEAM`
--

CREATE TABLE `PLAYER_TEAM` (
  `PLAYER_TEAM_ID` int(11) NOT NULL,
  `PLAYER_ID` int(11) DEFAULT NULL,
  `TEAM_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PLAYER_TEAM`
--

INSERT INTO `PLAYER_TEAM` (`PLAYER_TEAM_ID`, `PLAYER_ID`, `TEAM_ID`) VALUES
(21, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `PLAYER_TOURNAMENT`
--

CREATE TABLE `PLAYER_TOURNAMENT` (
  `PLAYER_TOURNAMENT_ID` int(11) NOT NULL,
  `PLAYER_ID` int(11) DEFAULT NULL,
  `TOURNAMENT_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PLAYER_TOURNAMENT`
--

INSERT INTO `PLAYER_TOURNAMENT` (`PLAYER_TOURNAMENT_ID`, `PLAYER_ID`, `TOURNAMENT_ID`) VALUES
(29, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `TEAM`
--

CREATE TABLE `TEAM` (
  `TEAM_ID` int(11) NOT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `LEADER_TOURNAMENT_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `TEAM`
--

INSERT INTO `TEAM` (`TEAM_ID`, `NAME`, `LEADER_TOURNAMENT_ID`) VALUES
(2, 'team_gladi', 29);

-- --------------------------------------------------------

--
-- Table structure for table `TEAM_REQUEST`
--

CREATE TABLE `TEAM_REQUEST` (
  `REQUEST_ID` int(11) NOT NULL,
  `PLAYER_TOURNAMENT_ID` int(11) DEFAULT NULL,
  `TEAM_NAME` varchar(255) DEFAULT NULL,
  `STATUS` varchar(255) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `TEAM_REQUEST`
--

INSERT INTO `TEAM_REQUEST` (`REQUEST_ID`, `PLAYER_TOURNAMENT_ID`, `TEAM_NAME`, `STATUS`) VALUES
(10, 29, 'team_gladi', '0');

-- --------------------------------------------------------

--
-- Table structure for table `TOURNAMENT`
--

CREATE TABLE `TOURNAMENT` (
  `TOURNAMENT_ID` int(11) NOT NULL,
  `ORGANIZER_ID` int(11) DEFAULT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `GAME_ID` int(11) DEFAULT NULL,
  `START_DATETIME` datetime DEFAULT NULL,
  `END_DATETIME` datetime DEFAULT NULL,
  `REGISTERCLOSE_DATETIME` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `TOURNAMENT`
--

INSERT INTO `TOURNAMENT` (`TOURNAMENT_ID`, `ORGANIZER_ID`, `NAME`, `GAME_ID`, `START_DATETIME`, `END_DATETIME`, `REGISTERCLOSE_DATETIME`) VALUES
(2, 1, 'BATTLE LEAGUE\'22', 1, '2022-06-01 18:00:00', '2022-06-10 18:00:00', '2022-05-30 18:00:00'),
(3, 2, 'CODASHOP GLOBAL SERIES', 2, '2022-06-03 18:00:00', '2022-06-20 18:00:00', '2022-06-01 18:00:00'),
(4, 3, 'COD GLOBAL SERIES', 4, '2022-06-03 18:00:00', '2022-06-20 18:00:00', '2022-06-01 18:00:00'),
(5, 4, 'DOTA 2 CHAMPIONSHIP', 5, '2022-06-03 18:00:00', '2022-06-20 18:00:00', '2022-06-01 18:00:00'),
(6, 5, 'APEX LEAGUE', 6, '2022-06-15 18:00:00', '2022-06-20 18:00:00', '2022-06-10 18:00:00'),
(7, 6, 'FREEFIRE LEAGUE', 3, '2022-06-20 18:00:00', '2022-06-25 18:00:00', '2022-06-19 18:00:00'),
(8, 1, 'VALORANT LEAGUE', 2, '2022-06-25 18:00:00', '2022-06-30 18:00:00', '2022-06-23 18:00:00'),
(9, 2, 'FREEFIRE TOURNAMENT\'22', 3, '2022-07-01 18:00:00', '2022-07-10 18:00:00', '2022-06-30 18:00:00'),
(10, 3, 'LEAGUE OF JULY', 1, '2022-07-03 18:00:00', '2022-07-10 18:00:00', '2022-07-01 18:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ADMIN`
--
ALTER TABLE `ADMIN`
  ADD PRIMARY KEY (`ADMIN_ID`);

--
-- Indexes for table `GAME`
--
ALTER TABLE `GAME`
  ADD PRIMARY KEY (`GAME_ID`);

--
-- Indexes for table `ORGANIZER`
--
ALTER TABLE `ORGANIZER`
  ADD PRIMARY KEY (`ORGANIZER_ID`);

--
-- Indexes for table `ORGANIZER_REQUEST`
--
ALTER TABLE `ORGANIZER_REQUEST`
  ADD PRIMARY KEY (`REQUEST_ID`);

--
-- Indexes for table `PLAYER`
--
ALTER TABLE `PLAYER`
  ADD PRIMARY KEY (`PLAYER_ID`);

--
-- Indexes for table `PLAYER_TEAM`
--
ALTER TABLE `PLAYER_TEAM`
  ADD PRIMARY KEY (`PLAYER_TEAM_ID`),
  ADD KEY `PLAYER_ID` (`PLAYER_ID`),
  ADD KEY `TEAM_ID` (`TEAM_ID`);

--
-- Indexes for table `PLAYER_TOURNAMENT`
--
ALTER TABLE `PLAYER_TOURNAMENT`
  ADD PRIMARY KEY (`PLAYER_TOURNAMENT_ID`),
  ADD KEY `PLAYER_ID` (`PLAYER_ID`),
  ADD KEY `TOURNAMENT_ID` (`TOURNAMENT_ID`);

--
-- Indexes for table `TEAM`
--
ALTER TABLE `TEAM`
  ADD PRIMARY KEY (`TEAM_ID`),
  ADD KEY `team_ibfk_1` (`LEADER_TOURNAMENT_ID`);

--
-- Indexes for table `TEAM_REQUEST`
--
ALTER TABLE `TEAM_REQUEST`
  ADD PRIMARY KEY (`REQUEST_ID`),
  ADD KEY `team_request_ibfk_1` (`PLAYER_TOURNAMENT_ID`);

--
-- Indexes for table `TOURNAMENT`
--
ALTER TABLE `TOURNAMENT`
  ADD PRIMARY KEY (`TOURNAMENT_ID`),
  ADD KEY `ORGANIZER_ID` (`ORGANIZER_ID`),
  ADD KEY `GAME_ID` (`GAME_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ADMIN`
--
ALTER TABLE `ADMIN`
  MODIFY `ADMIN_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `GAME`
--
ALTER TABLE `GAME`
  MODIFY `GAME_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ORGANIZER`
--
ALTER TABLE `ORGANIZER`
  MODIFY `ORGANIZER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ORGANIZER_REQUEST`
--
ALTER TABLE `ORGANIZER_REQUEST`
  MODIFY `REQUEST_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `PLAYER`
--
ALTER TABLE `PLAYER`
  MODIFY `PLAYER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `PLAYER_TEAM`
--
ALTER TABLE `PLAYER_TEAM`
  MODIFY `PLAYER_TEAM_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `PLAYER_TOURNAMENT`
--
ALTER TABLE `PLAYER_TOURNAMENT`
  MODIFY `PLAYER_TOURNAMENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `TEAM`
--
ALTER TABLE `TEAM`
  MODIFY `TEAM_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `TEAM_REQUEST`
--
ALTER TABLE `TEAM_REQUEST`
  MODIFY `REQUEST_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `TOURNAMENT`
--
ALTER TABLE `TOURNAMENT`
  MODIFY `TOURNAMENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `PLAYER_TEAM`
--
ALTER TABLE `PLAYER_TEAM`
  ADD CONSTRAINT `player_team_ibfk_1` FOREIGN KEY (`PLAYER_ID`) REFERENCES `PLAYER` (`PLAYER_ID`),
  ADD CONSTRAINT `player_team_ibfk_2` FOREIGN KEY (`TEAM_ID`) REFERENCES `TEAM` (`TEAM_ID`);

--
-- Constraints for table `PLAYER_TOURNAMENT`
--
ALTER TABLE `PLAYER_TOURNAMENT`
  ADD CONSTRAINT `player_tournament_ibfk_1` FOREIGN KEY (`PLAYER_ID`) REFERENCES `PLAYER` (`PLAYER_ID`),
  ADD CONSTRAINT `player_tournament_ibfk_2` FOREIGN KEY (`TOURNAMENT_ID`) REFERENCES `TOURNAMENT` (`TOURNAMENT_ID`);

--
-- Constraints for table `TEAM`
--
ALTER TABLE `TEAM`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`LEADER_TOURNAMENT_ID`) REFERENCES `PLAYER_TOURNAMENT` (`PLAYER_TOURNAMENT_ID`) ON DELETE CASCADE;

--
-- Constraints for table `TEAM_REQUEST`
--
ALTER TABLE `TEAM_REQUEST`
  ADD CONSTRAINT `team_request_ibfk_1` FOREIGN KEY (`PLAYER_TOURNAMENT_ID`) REFERENCES `PLAYER_TOURNAMENT` (`PLAYER_TOURNAMENT_ID`) ON DELETE CASCADE;

--
-- Constraints for table `TOURNAMENT`
--
ALTER TABLE `TOURNAMENT`
  ADD CONSTRAINT `tournament_ibfk_1` FOREIGN KEY (`ORGANIZER_ID`) REFERENCES `ORGANIZER` (`ORGANIZER_ID`),
  ADD CONSTRAINT `tournament_ibfk_2` FOREIGN KEY (`GAME_ID`) REFERENCES `GAME` (`GAME_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
