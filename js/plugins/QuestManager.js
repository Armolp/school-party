Kiwi.Plugins.QuestManager = {
    name: 'Quests',
    version: '1.0.0'
};

//CREATING QUESTS
/*
You can currently set two types of quests. 
Number quests keep track of a variable, and once it has reached it's specified objective, the quest is completed.
Boolean quests keep track of a variable and once it is true or false, depending on the objective set, the quest is completed.
To create your own quest, and the relevant information into Kiwi.Plugins.QuestManager.Quests.
VALUES:
active: Set if a quest has been started, and not yet completed.
complete: Set if a quest has been successfully completed.
type: 'number' or 'boolen'.
objective: Required value to complete an active quest.
current: Current value. Need to set current value to your objective value to complete a quest.
description: A string used to aid the player.
EXAMPLE:
Kiwi.Plugins.QuestManager.Quests = {
    //Set your quests below
    numberExample: {
        active: false,
        complete: false,
        type: 'number',
        objective: 5,
        current: 0,
        description: 'Collect 5 items.'
    },
    booleanExample: {
        active: false,
        complete: false,
        type: 'boolean',
        objective: true,
        current: false,
        description: 'Complete a simple task.'
    }
}
*/
Kiwi.Plugins.QuestManager.Quests = {
    //Set your quests below
    test: {
        active: false,
        complete: false,
        type: 'number',
        objective: 5,
        current: 0,
        description: 'Collect 5 items.'
    }
}

Kiwi.PluginManager.register(Kiwi.Plugins.QuestManager);


//You can also add a new quest object using this function. Please note that if one already exists the previous one will be over-written.
Kiwi.Plugins.QuestManager.createQuest = function(id, typeVar, startValue, objectiveVar, descriptionVar){
    Kiwi.Plugins.QuestManager.Quests[id] = {
        active: false,
        complete: false,
        type: typeVar,
        objective: objectiveVar,
        current: startValue,
        description: descriptionVar
    }
}

Kiwi.Plugins.QuestManager.startQuest = function (id) {
    if (Kiwi.Plugins.QuestManager.Quests[id] == undefined) {
        console.log('Quest Manager: Error starting quest. Attempted id:', id);
        return;
    }
    Kiwi.Plugins.QuestManager.Quests[id].active = true;
}

Kiwi.Plugins.QuestManager.completeQuest = function (id) {
    if (Kiwi.Plugins.QuestManager.Quests[id] == undefined) {
        console.log('Quest Manager: Error completing quest. Attempted id:', id);
        return;
    }
    Kiwi.Plugins.QuestManager.Quests[id].active = false;
    Kiwi.Plugins.QuestManager.Quests[id].complete = true;
}

Kiwi.Plugins.QuestManager.updateQuest = function (id, value) {
    var quest = Kiwi.Plugins.QuestManager.Quests[id];
    if (quest == undefined) {
        console.log('Quest Manager: Error updating quest. Attempted id:', id, ',attempted value:',value);
        return;
    }
    if (typeof (value) == typeof (quest.current)) {
        if (typeof (value) == 'number') {
            quest.current += value;
            if (quest.current >= quest.objective) {
                Kiwi.Plugins.QuestManager.completeQuest(id);
            }
        } else if (typeof (value) == 'boolean') {
            quest.current = value;
            if (quest.current === quest.objective) {
                Kiwi.Plugins.QuestManager.completeQuest(id);
            }
        }
    }
}

Kiwi.Plugins.QuestManager.checkStarted = function (id) {
    if (Kiwi.Plugins.QuestManager.Quests[id] == undefined) {
        console.log('Quest Manager: Error checking quest. Attempted id:', id);
        return;
    }
    if (Kiwi.Plugins.QuestManager.Quests[id].complete || Kiwi.Plugins.QuestManager.Quests[id].active) return true;
    return false;
}

Kiwi.Plugins.QuestManager.checkActive = function (id) {
    if (Kiwi.Plugins.QuestManager.Quests[id] == undefined) {
        console.log('Quest Manager: Error checking quest activity. Attempted id:', id);
        return;
    }
    if (Kiwi.Plugins.QuestManager.Quests[id].active) return true;
    return false;
}

Kiwi.Plugins.QuestManager.checkCompleted = function (id) {
    if (Kiwi.Plugins.QuestManager.Quests[id] == undefined) {
        console.log('Quest Manager: Error checking quest completion. Attempted id:', id);
        return;
    }
    if (Kiwi.Plugins.QuestManager.Quests[id].complete) return true;
    return false;
}

Kiwi.Plugins.QuestManager.returnDescription = function (id) {
    if (Kiwi.Plugins.QuestManager.Quests[id] == undefined) {
        console.log('Quest Manager: Error requesting description. Attempted id:', id);
        return;
    }
    return Kiwi.Plugins.QuestManager.Quests[id].description;
}

Kiwi.Plugins.QuestManager.returnCurrent = function (id) {
    if (Kiwi.Plugins.QuestManager.Quests[id] == undefined) {
        console.log('Quest Manager: Error requesting current amount. Attempted id:', id);
        return;
    }
    return Kiwi.Plugins.QuestManager.Quests[id].current;
}


Kiwi.Plugins.QuestManager.returnObjective = function (id) {
    if (Kiwi.Plugins.QuestManager.Quests[id] == undefined) {
        console.log('Quest Manager: Error requesting objective. Attempted id:', id);
        return;
    }
    return Kiwi.Plugins.QuestManager.Quests[id].objective;
}