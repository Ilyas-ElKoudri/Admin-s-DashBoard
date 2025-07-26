-- Add PhoneNumber column to Users table
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'PhoneNumber')
BEGIN
    ALTER TABLE [Users] ADD [PhoneNumber] nvarchar(max) NOT NULL DEFAULT '';
END

-- Mark the new migration as applied
IF NOT EXISTS (SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = '20250725222254_AddMissingColumns')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES ('20250725222254_AddMissingColumns', '8.0.0');
END

IF NOT EXISTS (SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = '20250725222254_AddPhoneNumberToUser')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES ('20250725222254_AddPhoneNumberToUser', '8.0.0');
END 