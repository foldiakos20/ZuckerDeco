-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Jún 12. 20:41
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `cukorvarazslat`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `offers`
--

CREATE TABLE `offers` (
  `id` int(4) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `message` varchar(200) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `offers`
--

INSERT INTO `offers` (`id`, `name`, `email`, `message`, `date`) VALUES
(5, 'Ódry Attila', 'odry.attila@keri.mako.hu', 'dsdsdsdsds', '2024-04-29'),
(6, 'Ákos', 'akoska610@gmail.com', 'szia', '2024-06-12'),
(7, 'akoss', 'akoska610@gmail.com', 'heloka', '2024-06-12');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `product_type` varchar(20) NOT NULL,
  `img` varchar(50) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `name`, `product_type`, `img`, `price`) VALUES
(1, 'Bambi', 'figurak', 'bambi.jpg', 2999),
(2, 'Grincs', 'figurak', 'grincs.jpeg', 2999),
(3, 'Oroszlánkirály', 'figurak', 'oroszlankiraly.jpeg', 3999),
(4, 'Verdák', 'figurak', 'verdak_matuka_mc_queen.jpeg', 4999),
(5, 'Dobermann', 'figurak', 'dog.jpeg', 2999),
(6, 'Mickey egér csomag', 'figurak', 'miki_eger_csomag.jpeg', 7999),
(7, 'Micimackó és barátai', 'figurak', 'micimacko.jpg', 3999),
(8, 'Jávorszarvas', 'figurak', 'szarvass.jpeg', 4999),
(9, 'Liliom', 'cukorviragdisz', 'liliom.jpeg', 4999),
(10, 'Cymbídium Orchidea', 'cukorviragdisz', 'cymbidium_orchidea.jpeg', 1999),
(11, 'Hóvirág', 'cukorviragdisz', 'hovirag.jpeg', 2599),
(12, 'Tulipán', 'cukorviragdisz', 'tulipanok.jpeg', 3999),
(13, 'Gyöngyvirág', 'cukorviragdisz', 'gyongyvirag.jpeg', 2999),
(14, 'Mikulás virág', 'cukorviragdisz', 'mikulasvirag.jpeg', 3499),
(15, 'Angol rózsa', 'cukorviragdisz', 'angol_rozsa.jpg', 2999),
(16, 'Rózsa', 'cukorviragdisz', 'bazsarozsa_rozsa.jpeg', 3199),
(17, 'A halott menyasszony', 'naszparok', 'halottmenny2.jpg', 4099),
(18, 'Király és királyné', 'naszparok', 'par3.jpg', 2699),
(19, 'Cicák', 'naszparok', 'parok8.jpeg', 4999),
(20, 'Shrek és Fióna', 'naszparok', 'shrekpar.jpg', 3000),
(21, 'Ludak', 'naszparok', 'ludak.jpeg', 2399),
(22, 'Mosómedvék', 'naszparok', 'mosomacik.jpeg', 3599),
(23, 'Arany rózsa', 'eskuvocukor', 'fantasia_rozsa.jpeg', 2999),
(24, 'Tulipán', 'eskuvocukor', 'tulipan_pink.jpeg', 1999),
(25, 'Orchidea', 'eskuvocukor', 'orchidea2.jpeg', 2499),
(26, 'Bazsarózsa', 'eskuvocukor', 'bazsarozsa_hortenzia.jpeg', 3999),
(27, 'Piros Orchidea', 'eskuvocukor', 'orchidea_piros.jpeg', 3499),
(28, 'Liliom', 'eskuvocukor', 'liliom.jpeg', 3299),
(29, 'Frézia', 'eskuvocukor', 'frezia_pillangovirag.jpeg', 2799),
(30, 'Anemóna', 'eskuvocukor', 'anemone.jpeg', 4299);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products_type`
--

CREATE TABLE `products_type` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `order_by` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `products_type`
--

INSERT INTO `products_type` (`id`, `type`, `name`, `order_by`) VALUES
(1, 'cukorviragdisz', 'Cukorvirágdísz', 2),
(2, 'eskuvocukor', 'Esküvő cukor', 4),
(3, 'figurak', 'Figurák', 1),
(4, 'naszparok', 'Nászpárok', 3);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `products_type`
--
ALTER TABLE `products_type`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `offers`
--
ALTER TABLE `offers`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT a táblához `products_type`
--
ALTER TABLE `products_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
