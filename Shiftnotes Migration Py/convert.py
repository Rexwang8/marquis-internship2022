#imports
import json
from uuid6 import uuid6

#object declarations
class ShiftNoteObject:
  def __init__(self, uuid, dttmstart, dttmend, facid):
    self.uuid = uuid
    self.dttmstart = dttmstart
    self.dttmend = dttmend
    self.facid = facid

class NoteObject:
  def __init__(self, uuid, shiftuuid, text, facid, dttmstart, isdeleted, dttmend):
    self.uuid = uuid
    self.shiftuuid = shiftuuid
    self.text = text
    self.isdeleted = isdeleted
    self.dttmstart = dttmstart
    self.dttmend = dttmend
    self.facid = facid


def getFacID(input):
    fac = ""
    if input == 1:
        fac = 'GUID--------------------------------'
    else:
        fac = 'GUID--------------------------------'
    return fac

def getFacnotesID(input):
    fac = ""
    match input:
        case 1:
            fac = 'GUID--------------------------------'
        case 2:
            fac = 'GUID--------------------------------'
        case 3:
            fac = 'GUID--------------------------------'
        case 4:
            fac = 'GUID--------------------------------'

    return fac


#ini arrays and vars
sncmdvalues = []
ncmdvalues = []
notes = json.load(open('notes.json', encoding="mbcs"))
shiftnotes = json.load(open('sn.json', encoding="mbcs"))

q = 0
for note in notes:
    if q % 500 == 0:
            print(f"Note count (includes orphans): {q}")
    q += 1

a = 0

for shiftnote in shiftnotes:
    uuid = uuid6()
    dttmstart = shiftnote['Start']
    dttmend = shiftnote['End']
    fac = getFacID(shiftnote['Facility'])

    
    #shiftnote
    newSN = ShiftNoteObject(uuid, dttmstart, dttmend, fac)
    sncmdvalues.append(f"('{newSN.uuid}','{newSN.facid}','{newSN.dttmstart}','{newSN.dttmend}',''), ")
    a += 1


    linkedNotes = [note for note in notes if note['ShiftId'] == shiftnote['Id']]
    for linkedNote in linkedNotes:
        fac2 = getFacnotesID(int(linkedNote['Department']))
        a += 1
        newN = NoteObject(uuid6(), uuid, linkedNote['Text'], fac2, newSN.dttmstart, linkedNote['IsDeleted'], linkedNote['DeletionDate'])
        txt = str(newN.text).replace('\'', '\'\'').replace('\n','')

        created = f"'{newN.dttmend}'" if newN.dttmend is not None else 'null'
        ncmdvalues.append(f"('{newN.uuid}','{newN.shiftuuid}','{txt}','{newN.facid}','GUID--------------------------------','{newN.dttmstart}','{newN.isdeleted}',{created}),") 

        if a % 500 == 0:
            print(f"Iteration: {a}")


with open('command.txt', "w", encoding="utf-8") as f:
    b = 0
    header = "INSERT INTO [SightGlass].[SightGlass].[ShiftNotesShifts] ([ShiftNotesShiftId] ,[AppFacilityId] ,[ShiftStartDttm] ,[ShiftEndTime] ,[ShiftNameStored]) VALUES"
    while len(sncmdvalues) > 0:
        

        if len(sncmdvalues) >= 1000:
            cmd = f"{header} {''.join(sncmdvalues[0:1000])};"
            cmd = cmd[:-4] + ');\n'
            f.write(cmd)
            del sncmdvalues[0:1000]
        else:
            cmd = f"{header} {''.join(sncmdvalues[0:len(sncmdvalues)])};"
            cmd = cmd[:-4] + ');\n'
            f.write(cmd)
            del sncmdvalues[0:len(sncmdvalues)]

        b += 1
        print(f"Shiftnotes: {b * 1000}")
    f.close()




with open('command2.txt', "w", encoding="utf-8") as f:
    c = 0
    header = "INSERT INTO [SightGlass].[SightGlass].[ShiftNotesNotes] ([ShiftNotesNoteId] ,[ShiftNotesShiftId] ,[Text] ,[AppDepartmentId], [AppUserId] ,[DttmCreated] ,[IsDeleted] ,[DttmDeleted]) VALUES "
    while len(ncmdvalues) > 0:
        

        if len(ncmdvalues) >= 200:
            cmd = f"{header} {''.join(ncmdvalues[0:200])};"
            cmd = cmd[:-3] + ');\n'
            f.write(cmd)
            del ncmdvalues[0:200]
        else:
            cmd = f"{header} {(''.join(ncmdvalues[0:len(ncmdvalues)]))};"
            cmd = cmd[:-3] + ');\n'
            f.write(cmd)
            del ncmdvalues[0:len(ncmdvalues)]

        c += 1
        print(f"Notes: {c * 200}")
    f.close()


print("Complete")
