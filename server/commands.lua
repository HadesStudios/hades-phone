function RegisterChatCommands()
	Chat:RegisterAdminCommand("clearalias", function(source, args, rawCommand)
		if tonumber(args[1]) then
			local plyr = Fetch:SID(tonumber(args[1]))
			if plyr ~= nil then
				local char = plyr:GetData("Character")
				if char ~= nil then
					local aliases = char:GetData("Alias")
					aliases[args[2]] = nil
					char:SetData("Alias", aliases)
					Chat.Send.System:Single(
						source,
						string.format(
							"Alias Cleared For %s %s (%s) For %s",
							char:GetData("First"),
							char:GetData("Last"),
							char:GetData("SID"),
							args[2]
						)
					)
				else
					Chat.Send.System:Single(source, "Invalid Target")
				end
			else
				Chat.Send.System:Single(source, "Invalid Target")
			end
		else
			Chat.Send.System:Single(source, "Invalid Target")
		end
	end, {
		help = "[Admin] Clear Player App Alias",
		params = {
			{
				name = "SID",
				help = "Target State ID",
			},
			{
				name = "App ID",
				help = "App ID to reset the players alias for",
			},
		},
	}, 2)

	Chat:RegisterStaffCommand("ctwitter", function(source, args, rawCommand)
		ClearAllTweets(tonumber(args[1]))
		Chat.Send.System:Single(source, "All Tweets Removed")
	end, {
		help = "[Admin] Clear All Tweets",
		params = {
			{
				name = "SID",
				help = "(Optional) Target State ID",
			},
		},
	}, -1)

	Chat:RegisterStaffCommand("twitteraccount", function(source, args, rawCommand)
		local twitterName = args[1]

		Database.Game:findOne({
			collection = "characters",
			query = {
				["Alias.twitter.name"] = twitterName,
			},
		}, function(success, results)
			if success and #results > 0 then
				local char = results[1]
				Chat.Send.System:Single(
					source,
					string.format(
						"Twitter Account Found With Name: %s. %s %s (SID: %s) [User: %s]",
						twitterName,
						char.First,
						char.Last,
						char.SID,
						char.User
					)
				)
			else
				Chat.Send.System:Single(source, "No Twitter Account Found")
			end
		end)
	end, {
		help = "[Admin] Get Twitter Account Owner",
		params = {
			{
				name = "Account Name",
				help = "Account Name of User You Want to Find",
			},
		},
	}, 1)

	Chat:RegisterAdminCommand("reloadtracks", function(source, args, rawCommand)
		ReloadRaceTracks()
		Chat.Send.System:Single(source, "Reload Vroom Vrooms")
	end, {
		help = "[Admin] Clear All Tweets",
	}, 0)

	Chat:RegisterAdminCommand("twitterverify", function(source, args, rawCommand)
		local stateId = tonumber(args[1])
		local verificationType = args[2] or "verified" -- verified, business, government

		if not stateId then
			Chat.Send.System:Single(source, "Usage: /twitterverify [State ID] [Type: verified/business/government]")
			return
		end

		Database.Game:updateOne({
			collection = "characters",
			query = {
				SID = stateId,
			},
			update = {
				["$set"] = {
					["Alias.twitter.verified"] = verificationType,
				},
			},
		}, function(success, results)
			if success and results.matchedCount > 0 then
				Chat.Send.System:Single(source, string.format("Set Twitter verification for SID %s to: %s", stateId, verificationType))
				
				-- Update existing tweets if online
				local player = Fetch:SID(stateId)
				if player then
					TriggerEvent("Phone:Server:AliasUpdated", player:GetData("Source"))
				end
			else
				Chat.Send.System:Single(source, "No character found with that State ID")
			end
		end)
	end, {
		help = "[Admin] Set Twitter Verification Status",
		params = {
			{
				name = "State ID",
				help = "State ID of the character",
			},
			{
				name = "Type",
				help = "Verification type: verified, business, government",
			},
		},
	}, 1)

	Chat:RegisterAdminCommand("twitterunverify", function(source, args, rawCommand)
		local stateId = tonumber(args[1])

		if not stateId then
			Chat.Send.System:Single(source, "Usage: /twitterunverify [State ID]")
			return
		end

		Database.Game:updateOne({
			collection = "characters",
			query = {
				SID = stateId,
			},
			update = {
				["$unset"] = {
					["Alias.twitter.verified"] = "",
				},
			},
		}, function(success, results)
			if success and results.matchedCount > 0 then
				Chat.Send.System:Single(source, string.format("Removed Twitter verification for SID %s", stateId))
				
				-- Update existing tweets if online
				local player = Fetch:SID(stateId)
				if player then
					TriggerEvent("Phone:Server:AliasUpdated", player:GetData("Source"))
				end
			else
				Chat.Send.System:Single(source, "No character found with that State ID")
			end
		end)
	end, {
		help = "[Admin] Remove Twitter Verification",
		params = {
			{
				name = "State ID",
				help = "State ID of the character",
			},
		},
	}, 1)
end
