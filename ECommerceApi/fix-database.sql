-- Fix Database Schema - Add Missing Columns
-- Run this script in SQL Server Management Studio

USE [ECommerceDB]
GO

-- Add missing columns to Users table
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'Name')
BEGIN
    -- First, rename FullName to Name if it exists
    IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'FullName')
    BEGIN
        EXEC sp_rename 'Users.FullName', 'Name', 'COLUMN'
    END
    ELSE
    BEGIN
        -- Add Name column if FullName doesn't exist
        ALTER TABLE [Users] ADD [Name] nvarchar(100) NOT NULL DEFAULT ''
    END
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'AvatarUrl')
BEGIN
    ALTER TABLE [Users] ADD [AvatarUrl] nvarchar(max) NOT NULL DEFAULT ''
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'PhoneNumber')
BEGIN
    ALTER TABLE [Users] ADD [PhoneNumber] nvarchar(max) NOT NULL DEFAULT ''
END

-- Add missing columns to Products table
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Products' AND COLUMN_NAME = 'ImageUrl')
BEGIN
    ALTER TABLE [Products] ADD [ImageUrl] nvarchar(max) NOT NULL DEFAULT ''
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Products' AND COLUMN_NAME = 'Description')
BEGIN
    ALTER TABLE [Products] ADD [Description] nvarchar(500) NOT NULL DEFAULT ''
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Products' AND COLUMN_NAME = 'Rating')
BEGIN
    ALTER TABLE [Products] ADD [Rating] float NOT NULL DEFAULT 0.0
END

-- Update migration history to mark all migrations as applied
IF NOT EXISTS (SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = '20250712164318_InitialCreate')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES ('20250712164318_InitialCreate', '8.0.0')
END

IF NOT EXISTS (SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = '20250713132616_AddECommerceEntities')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES ('20250713132616_AddECommerceEntities', '8.0.0')
END

IF NOT EXISTS (SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = '20250714151429_AddUserAndCartEntities')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES ('20250714151429_AddUserAndCartEntities', '8.0.0')
END

IF NOT EXISTS (SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = '20250715185738_FixUserProductRelation')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES ('20250715185738_FixUserProductRelation', '8.0.0')
END

IF NOT EXISTS (SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = '20250725222254_AddMissingColumns')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES ('20250725222254_AddMissingColumns', '8.0.0')
END

IF NOT EXISTS (SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = '20250725222254_AddPhoneNumberToUser')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES ('20250725222254_AddPhoneNumberToUser', '8.0.0')
END

PRINT 'Database schema updated successfully!'
GO 