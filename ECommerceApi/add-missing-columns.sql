-- Add missing columns to Products table
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Products' AND COLUMN_NAME = 'ImageUrl')
BEGIN
    ALTER TABLE Products ADD ImageUrl nvarchar(max) NOT NULL DEFAULT '';
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Products' AND COLUMN_NAME = 'Description')
BEGIN
    ALTER TABLE Products ADD Description nvarchar(500) NOT NULL DEFAULT '';
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Products' AND COLUMN_NAME = 'Rating')
BEGIN
    ALTER TABLE Products ADD Rating float NOT NULL DEFAULT 0.0;
END

-- Add missing columns to Users table
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'AvatarUrl')
BEGIN
    ALTER TABLE Users ADD AvatarUrl nvarchar(max) NOT NULL DEFAULT '';
END

-- Rename FullName to Name if it exists
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'FullName')
BEGIN
    EXEC sp_rename 'Users.FullName', 'Name', 'COLUMN';
END

-- Insert migration history
IF NOT EXISTS (SELECT * FROM __EFMigrationsHistory WHERE MigrationId = '20250712164318_InitialCreate')
BEGIN
    INSERT INTO __EFMigrationsHistory (MigrationId, ProductVersion) VALUES ('20250712164318_InitialCreate', '8.0.0');
END

IF NOT EXISTS (SELECT * FROM __EFMigrationsHistory WHERE MigrationId = '20250713132616_AddECommerceEntities')
BEGIN
    INSERT INTO __EFMigrationsHistory (MigrationId, ProductVersion) VALUES ('20250713132616_AddECommerceEntities', '8.0.0');
END

IF NOT EXISTS (SELECT * FROM __EFMigrationsHistory WHERE MigrationId = '20250714151429_AddUserAndCartEntities')
BEGIN
    INSERT INTO __EFMigrationsHistory (MigrationId, ProductVersion) VALUES ('20250714151429_AddUserAndCartEntities', '8.0.0');
END

IF NOT EXISTS (SELECT * FROM __EFMigrationsHistory WHERE MigrationId = '20250715185738_FixUserProductRelation')
BEGIN
    INSERT INTO __EFMigrationsHistory (MigrationId, ProductVersion) VALUES ('20250715185738_FixUserProductRelation', '8.0.0');
END 