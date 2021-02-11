CREATE TABLE Guilds (
    guildID VARCHAR(50) NOT NULL PRIMARY KEY,
    guildOwnerID VARCHAR(50) NOT NULL
);

CREATE TABLE GuildConfig (
    guildID VARCHAR(50) NOT NULL PRIMARY KEY,
    cmdPrefix VARCHAR(10) DEFAULT '!',
    modLogID VARCHAR(50) DEFAULT NULL, -- text channel ID for logging bot actions
    botChannel VARCHAR(50) DEFAULT NULL, -- channel for commands to be used in
    adminBotChannel VARCHAR(50) DEFAULT NULL, -- same as above but for admin access only, if wanting to hide from normal users
    userRoleID VARCHAR(50) DEFAULT NULL, -- default role ID of members that join the guild.
    memberRoleID VARCHAR(50) DEFAULT NULL, -- role ID of users who are a known member of something
    muteRoleID VARCHAR(50) DEFAULT NULL -- role ID of role that disallows sending messages in all channels, must be above the roles you want to mute for overrides.
);
