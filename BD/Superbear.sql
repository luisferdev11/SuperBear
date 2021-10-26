-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema SuperBear
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema SuperBear
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SuperBear` DEFAULT CHARACTER SET utf8 ;
USE `SuperBear` ;

-- -----------------------------------------------------
-- Table `SuperBear`.`MAdministrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`MAdministrador` (
  `id_Adm` INT NOT NULL AUTO_INCREMENT,
  `Cor_Adm` VARCHAR(64) NOT NULL,
  `Con_Adm` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id_Adm`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`DNoticias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`DNoticias` (
  `idDNoticias` INT NOT NULL AUTO_INCREMENT,
  `tit_not` VARCHAR(43) NOT NULL,
  `cont_not` VARCHAR(129) NOT NULL,
  `fec_not` DATE NOT NULL,
  `id_Adm` INT NOT NULL,
  PRIMARY KEY (`idDNoticias`),
  INDEX `id_Adm_idx` (`id_Adm` ASC),
  CONSTRAINT `id_Adm`
    FOREIGN KEY (`id_Adm`)
    REFERENCES `SuperBear`.`MAdministrador` (`id_Adm`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`CAlcaldia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`CAlcaldia` (
  `id_alc` INT NOT NULL,
  `nom_alc` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`id_alc`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`ENoticia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`ENoticia` (
  `id_ENot` INT NOT NULL AUTO_INCREMENT,
  `idDNoticias` INT NOT NULL,
  `id_alca` INT NOT NULL,
  PRIMARY KEY (`id_ENot`),
  INDEX `idDNoticias_idx` (`idDNoticias` ASC),
  INDEX `id_alca_idx` (`id_alca` ASC),
  CONSTRAINT `idDNoticias`
    FOREIGN KEY (`idDNoticias`)
    REFERENCES `SuperBear`.`DNoticias` (`idDNoticias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_alca`
    FOREIGN KEY (`id_alca`)
    REFERENCES `SuperBear`.`CAlcaldia` (`id_alc`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`CSexo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`CSexo` (
  `id_sex` INT NOT NULL,
  `sexo` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_sex`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`MUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`MUsuario` (
  `id_usu` INT NOT NULL AUTO_INCREMENT,
  `cor_usu` VARCHAR(64) NOT NULL,
  `nom_usu` VARCHAR(32) NOT NULL,
  `fec_nac` DATE NOT NULL,
  `con_usu` VARCHAR(64) NOT NULL,
  `id_alc` INT NOT NULL,
  `id_sex` INT NOT NULL,
  PRIMARY KEY (`id_usu`),
  INDEX `id_alc_idx` (`id_alc` ASC),
  INDEX `id_sex_idx` (`id_sex` ASC),
  CONSTRAINT `id_alc`
    FOREIGN KEY (`id_alc`)
    REFERENCES `SuperBear`.`CAlcaldia` (`id_alc`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_sex`
    FOREIGN KEY (`id_sex`)
    REFERENCES `SuperBear`.`CSexo` (`id_sex`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`MGrupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`MGrupo` (
  `id_grp` INT NOT NULL AUTO_INCREMENT,
  `nom_grp` VARCHAR(20) NOT NULL,
  `cod_grp` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`id_grp`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`CPrivilegio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`CPrivilegio` (
  `id_priv` INT NOT NULL,
  `priv_grp` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_priv`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`EGrupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`EGrupo` (
  `id_egp` INT NOT NULL AUTO_INCREMENT,
  `id_usu` INT NOT NULL,
  `id_grp` INT NOT NULL,
  `id_priv` INT NOT NULL,
  PRIMARY KEY (`id_egp`),
  INDEX `id_usu_idx` (`id_usu` ASC),
  INDEX `id_grp_idx` (`id_grp` ASC),
  INDEX `id_priv_idx` (`id_priv` ASC),
  CONSTRAINT `id_usu`
    FOREIGN KEY (`id_usu`)
    REFERENCES `SuperBear`.`MUsuario` (`id_usu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_grp`
    FOREIGN KEY (`id_grp`)
    REFERENCES `SuperBear`.`MGrupo` (`id_grp`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_priv`
    FOREIGN KEY (`id_priv`)
    REFERENCES `SuperBear`.`CPrivilegio` (`id_priv`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`CEstadoList`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`CEstadoList` (
  `id_esList` INT NOT NULL AUTO_INCREMENT,
  `estado_lis` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_esList`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`MLista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`MLista` (
  `id_lis` INT NOT NULL AUTO_INCREMENT,
  `nom_lis` VARCHAR(20) NOT NULL,
  `fec_lis` DATE NOT NULL,
  `tot_list` DOUBLE NOT NULL,
  `id_esList` INT NOT NULL,
  PRIMARY KEY (`id_lis`),
  INDEX `id_esList_idx` (`id_esList` ASC),
  CONSTRAINT `id_esList`
    FOREIGN KEY (`id_esList`)
    REFERENCES `SuperBear`.`CEstadoList` (`id_esList`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`ELista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`ELista` (
  `id_eli` INT NOT NULL AUTO_INCREMENT,
  `id_gpo` INT NOT NULL,
  `id_lst` INT NOT NULL,
  PRIMARY KEY (`id_eli`),
  INDEX `id_gpo_idx` (`id_gpo` ASC),
  INDEX `id_lst_idx` (`id_lst` ASC),
  CONSTRAINT `id_gpo`
    FOREIGN KEY (`id_gpo`)
    REFERENCES `SuperBear`.`MGrupo` (`id_grp`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_lst`
    FOREIGN KEY (`id_lst`)
    REFERENCES `SuperBear`.`MLista` (`id_lis`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`CTipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`CTipo` (
  `id_tip` INT NOT NULL,
  `tipo` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_tip`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`CMarca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`CMarca` (
  `id_mar` INT NOT NULL,
  `Marca` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_mar`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`CDepartamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`CDepartamento` (
  `id_dep` INT NOT NULL,
  `nom_dep` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`id_dep`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`CUnidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`CUnidad` (
  `id_uni` INT NOT NULL,
  `unidad` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_uni`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`CSupermercado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`CSupermercado` (
  `id_sup` INT NOT NULL,
  `nom_sup` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`id_sup`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`DProducto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`DProducto` (
  `id_pro` INT NOT NULL AUTO_INCREMENT,
  `nom_pro` VARCHAR(45) NOT NULL,
  `can_pro` INT NULL,
  `precio_pro` DOUBLE NULL,
  `notas_pro` VARCHAR(64) NULL,
  `id_tip` INT NULL,
  `id_mar` INT NULL,
  `id_dep` INT NULL,
  `id_uni` INT NULL,
  `id_sup` INT NULL,
  PRIMARY KEY (`id_pro`),
  INDEX `id_tip_idx` (`id_tip` ASC),
  INDEX `id_mar_idx` (`id_mar` ASC),
  INDEX `id_dep_idx` (`id_dep` ASC),
  INDEX `id_uni_idx` (`id_uni` ASC),
  INDEX `id_sup_idx` (`id_sup` ASC),
  CONSTRAINT `id_tip`
    FOREIGN KEY (`id_tip`)
    REFERENCES `SuperBear`.`CTipo` (`id_tip`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_mar`
    FOREIGN KEY (`id_mar`)
    REFERENCES `SuperBear`.`CMarca` (`id_mar`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_dep`
    FOREIGN KEY (`id_dep`)
    REFERENCES `SuperBear`.`CDepartamento` (`id_dep`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_uni`
    FOREIGN KEY (`id_uni`)
    REFERENCES `SuperBear`.`CUnidad` (`id_uni`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_sup`
    FOREIGN KEY (`id_sup`)
    REFERENCES `SuperBear`.`CSupermercado` (`id_sup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`CEstadoProd`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`CEstadoProd` (
  `id_esProd` INT NOT NULL AUTO_INCREMENT,
  `estado_prod` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_esProd`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SuperBear`.`EProducto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SuperBear`.`EProducto` (
  `id_dli` INT NOT NULL AUTO_INCREMENT,
  `cant` INT NOT NULL,
  `id_lis` INT NOT NULL,
  `id_esProd` INT NOT NULL,
  `id_pro` INT NOT NULL,
  PRIMARY KEY (`id_dli`),
  INDEX `id_lis_idx` (`id_lis` ASC),
  INDEX `id_pro_idx` (`id_pro` ASC),
  INDEX `id_esProd_idx` (`id_esProd` ASC),
  CONSTRAINT `id_lis`
    FOREIGN KEY (`id_lis`)
    REFERENCES `SuperBear`.`MLista` (`id_lis`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_pro`
    FOREIGN KEY (`id_pro`)
    REFERENCES `SuperBear`.`DProducto` (`id_pro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_esProd`
    FOREIGN KEY (`id_esProd`)
    REFERENCES `SuperBear`.`CEstadoProd` (`id_esProd`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
