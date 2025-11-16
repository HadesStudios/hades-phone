local _tweets = {}

-- Function to determine verification status
function GetVerificationStatus(char)
	local stateId = char:GetData("SID")
	local jobs = char:GetData("Jobs") or {}
	local governmentJobs = {"police", "ems", "government", "doj", "mayor", "deputy_mayor"}
	
	-- Check for manual verification first
	local alias = char:GetData("Alias") or {}
	if alias.twitter and alias.twitter.verified then
		return alias.twitter.verified
	end
	
	-- Check for government job
	for _, job in ipairs(jobs) do
		for _, govJob in ipairs(governmentJobs) do
			if job.Id == govJob then
				return "government"
			end
		end
	end
	
	-- Check for business ownership
	for _, job in ipairs(jobs) do
		local jobData = Jobs:Get(job.Id)
		if jobData then
			-- Check if they are the owner
			if jobData.Owner and jobData.Owner == stateId then
				return "business"
			end
			
			-- Check if they have the highest grade
			if job.Grade and job.Grade.Level then
				local highestGrade = 0
				if jobData.Grades then
					for _, grade in ipairs(jobData.Grades) do
						if grade.Level and grade.Level > highestGrade then
							highestGrade = grade.Level
						end
					end
				end
				if jobData.Workplaces then
					for _, workplace in ipairs(jobData.Workplaces) do
						if workplace.Grades then
							for _, grade in ipairs(workplace.Grades) do
								if grade.Level and grade.Level > highestGrade then
									highestGrade = grade.Level
								end
							end
						end
					end
				end
				
				if job.Grade.Level >= highestGrade then
					return "business"
				end
			end
		end
	end
	
	return false
end
AddEventHandler("Phone:Server:AliasUpdated", function(src)
	local char = Fetch:Source(src):GetData("Character")
	local cid = char:GetData("ID")
	for k, v in ipairs(_tweets) do
		if v.cid == cid then
			v.author = char:GetData("Alias").twitter
			
			-- Update verification status
			local verification = GetVerificationStatus(char)
			if verification then
				v.verified = verification
			else
				v.verified = nil
			end
		end
	end
	TriggerClientEvent("Phone:Client:SetData", -1, "tweets", _tweets)
end)

function ClearAllTweets(stateId)
	if stateId then
		local newTweets = {}

		for k, v in ipairs(_tweets) do
			if v.SID ~= stateId then
				table.insert(newTweets, v)
			end
		end

		_tweets = newTweets
		TriggerClientEvent("Phone:Client:SetData", -1, "tweets", _tweets)
	else
		_tweets = {}
		TriggerClientEvent("Phone:Client:SetData", -1, "tweets", _tweets)
	end
end

AddEventHandler("Phone:Server:RegisterMiddleware", function()
	Middleware:Add("Characters:Spawning", function(source)
		TriggerClientEvent("Phone:Client:SetData", source, "tweets", _tweets)
	end, 2)
	Middleware:Add("Phone:UIReset", function(source)
		TriggerClientEvent("Phone:Client:SetData", source, "tweets", _tweets)
	end, 2)
	Middleware:Add("Phone:CharacterCreated", function(source, cData)
		return {{
			app = "twitter",
			alias = {
				avatar = nil,
				name = string.format("%s%s%s", cData.First, cData.Last, cData.SID),
			},
		}}
	end)
end)

AddEventHandler("Phone:Server:RegisterCallbacks", function()
	Callbacks:RegisterServerCallback("Phone:Twitter:CreateTweet", function(source, data, cb)
		local src = source
		local char = Fetch:Source(src):GetData("Character")
		data.source = src
		data._id = #_tweets + 1
		data.SID = char:GetData("SID")
		data.cid = char:GetData("ID")
		if not data.author or not data.verified then
			data.author = char:GetData("Alias").twitter
		end
		
		-- Add verification status
		local verification = GetVerificationStatus(char)
		if verification then
			data.verified = verification
		end
		
		data.time = os.time() * 1000
		table.insert(_tweets, data)
		TriggerClientEvent("Phone:Client:Twitter:Notify", -1, data)
		cb(true)
	end, 1)
		
		-- Add verification status
		local verification = GetVerificationStatus(char)
		if verification then
			data.verified = verification
		end
		
		table.insert(_tweets, data)
		TriggerClientEvent("Phone:Client:Twitter:Notify", -1, data)
		cb(true)
	end, 1)

	Callbacks:RegisterServerCallback("Phone:Twitter:Favorite", function(source, data, cb)
		local src = source
		local char = Fetch:Source(src):GetData("Character")
		local _id = char:GetData("ID")
		if not data.state then
			table.insert(_tweets[data.id].likes, _id)
		else
			local t = {}
			for k, v in ipairs(_tweets[data.id].likes) do
				if v ~= _id then
					table.insert(t, v)
				end
			end
			_tweets[data.id].likes = t
		end
		TriggerClientEvent("Phone:Client:Twitter:UpdateLikes", -1, _tweets[data.id])
		cb(true)
	end)
end)
