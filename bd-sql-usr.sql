SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `users` (`userID`, `username`, `passwordHash`, `creationDate`) VALUES
(7, 'effyprime777', '$2y$10$T8hOT9mKY2QMJmlax5K6fuXuB.M63uNUIAM2IMU/APyGJQabCU316', '2024-05-26 08:01:11'),
(8, 'gordobondi89', '$2y$10$SQQKAqusQI.dpYpwoDIyx.AaTP8Yr.YvGUsvkdCdz3oWXN8UfG05i', '2024-05-26 08:16:53');

ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);


ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;