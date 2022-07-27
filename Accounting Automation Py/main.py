from ensurepip import version
from tkinter import *
from tkinter import ttk
from tkinter import filedialog as fd
from tkinter.messagebox import showinfo
import csv
import os



def select_file():
    #get filename from file selector utilitiy
    filetypes = (
        ('CSV files', '*.csv'),
        ('All files', '*.*')
    )

    global filename
    filename = fd.askopenfilename(
        title='Open a file',
        initialdir='/',
        filetypes=filetypes)

    if not filename.lower().endswith('.csv'):
        showinfo(
        title='Unknown File Type',
        message='This file does not appear to end with .csv!')
    else:
        ttk.Label(frm, text=f"Selected Path: {filename}").grid(column=0, row=2)
        openFile()

    


def main():
    global version
    version = "0.11"


    #supported dropdown options
    options = [
    "Schedule A",
    "n/a"]
    #use tk to generate window
    root = Tk()
    root.title('PRNutil')
    root.geometry('800x200')
    global frm 
    frm = ttk.Frame(root, padding=10)
    frm.grid()


    global suplabel
    suplabel = ttk.Label(frm, text="PRNutil  Currently supported: A/D/DA/MG")
    suplabel.grid(column=0, row=0)

    ttk.Label(frm, text="Select a .CSV file and select a parse format to start.").grid(column=0, row=2)
    ttk.Button(frm, text="Select a CSV", command=select_file).grid(column=1, row=1)
    ttk.Button(frm, text="Quit", command=root.destroy).grid(column=1, row=0)

    #global selection
    #selection = StringVar()
    #selection.set(options[0])

    #global drop
    #drop = OptionMenu( root , selection , *options, command = showSup )
    #drop.grid(column=2, row=1)

    ttk.Label(frm, text=f"Made by Rex Wang for Marquis Energy LLC 06/23/22 V{version}").grid(column=0, row=3)
    
    #ini window
    root.mainloop()


#def showSup(event):
#     suplabel.config(text = {"Currently selected: " + selection.get()})
#     suplabel.grid(column=0, row=0)



def openFile():
    #open file and call processrow
    with open(filename, 'r') as csvfile:
        csv_reader = csv.reader(csvfile, delimiter=',')
        line_count = 0
        arr = []
        for row in csv_reader:
            sched, type = findident(row)

            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                line_count += 1
                #note: S/V/Z are essentially identical in format but they are written seperately
                if(type == 'E'):
                    match sched:
                        case 'A':
                            print("A-Line Entry found")
                            arr.append(processRowA(row))
                        case 'D':
                            print("D-Line Entry found")
                            arr.append(processRowD(row))
                        case 'DA':
                            print("DA-Line Entry found")
                            arr.append(processRowDA(row))
                elif(type == 'S'):
                    print("S-Line Schedule total found")
                    arr.append(processRowS(row))
                elif(type == 'V'):
                    print("V-Line License total found")
                    arr.append(processRowV(row))
                elif(type == 'Z'):
                    print("Z-Line File total found")
                    arr.append(processRowZ(row))
                
        print(f'Processed {line_count} lines.')
        csvfile.close()

        #list comprehension remove empty lines
        arr = [i for i in arr if i.strip()]
        #make new file
        writeFile(arr)
        
def findident(row):
    return(row[1].strip(), row[4].strip())

def processRowS(row):
    #ini dictionary
    formattedS = {}
    #enter data and justify
    formattedS['1 FILER LICENSE'] = f"{row[0].strip():<17}"
    formattedS['2 IDOR SCHEDULE TYPE'] = f"{row[1].strip():<3}"
    formattedS['3 FILER PERMIT KIND'] = f"{row[2].strip():<2}"
    formattedS['4 FILER LICENSEYEAR'] = f"{row[3].strip():<2}"
    formattedS['5 RECORD TYPE'] = f"{row[4].strip():<1}"
    formattedS['6 FILING INDICATOR'] = f"{row[5].strip():<1}"
    formattedS['7 FILER PETRODEX INDICATOR'] = f"{row[6].strip():<1}"
    formattedS['8 FILER NAME'] = f"{row[7].strip():<20}"
    formattedS['9 LIABILITY DATE'] = f"{row[8].strip():<4}"
    formattedS['10 FILLER'] = f"{row[9].strip():<5}"
    formattedS['11 FILLER2'] = f"{row[10].strip():<15}"
    formattedS['12 FILLER3'] = f"{row[11].strip():<15}"
    formattedS['13 FILLER4'] = f"{row[12].strip():<15}"
    formattedS['14 SCHEDULE NET GALLONS'] = f"{row[13].strip():<15}"
    formattedS['15 FILLER5'] = f"{row[14].strip():<10}"
    formattedS['16 TOTAL ORIGINAL ENTRIES'] = f"{row[15].strip():<10}"
    formattedS['17 TOTAL CORRECTION ENTRIES'] = f"{row[16].strip():<10}"
    formattedS['18 TOTAL REVERSAL ENTRIES'] = f"{row[17].strip():<10}"
    formattedS['19 TOTAL NEGATIVE ENTRIES'] = f"{row[18].strip():<10}"
    formattedS['20 FILLER6'] = f"{row[19].strip():<90}"

    #truncate if too large
    formattedS['1 FILER LICENSE'] = formattedS['1 FILER LICENSE'][:17]
    formattedS['2 IDOR SCHEDULE TYPE'] = formattedS['2 IDOR SCHEDULE TYPE'][:3]
    formattedS['3 FILER PERMIT KIND'] = formattedS['3 FILER PERMIT KIND'][:2]
    formattedS['4 FILER LICENSEYEAR'] = formattedS['4 FILER LICENSEYEAR'][:2]
    formattedS['5 RECORD TYPE'] = formattedS['5 RECORD TYPE'][:1]
    formattedS['6 FILING INDICATOR'] = formattedS['6 FILING INDICATOR'][:1]
    formattedS['7 FILER PETRODEX INDICATOR'] = formattedS['7 FILER PETRODEX INDICATOR'][:1]
    formattedS['8 FILER NAME'] = formattedS['8 FILER NAME'][:20]
    formattedS['9 LIABILITY DATE'] = formattedS['9 LIABILITY DATE'][:4]
    formattedS['10 FILLER'] = formattedS['10 FILLER'][:5]
    formattedS['11 FILLER2'] = formattedS['11 FILLER2'][:15]
    formattedS['12 FILLER3'] = formattedS['12 FILLER3'][:15]
    formattedS['13 FILLER4'] = formattedS['13 FILLER4'][:15]
    formattedS['14 SCHEDULE NET GALLONS'] = formattedS['14 SCHEDULE NET GALLONS'][:15]
    formattedS['15 FILLER5'] = formattedS['15 FILLER5'][:10]
    formattedS['16 TOTAL ORIGINAL ENTRIES'] = formattedS['16 TOTAL ORIGINAL ENTRIES'][:10]
    formattedS['17 TOTAL CORRECTION ENTRIES'] = formattedS['17 TOTAL CORRECTION ENTRIES'][:10]
    formattedS['18 TOTAL REVERSAL ENTRIES'] = formattedS['18 TOTAL REVERSAL ENTRIES'][:10]
    formattedS['19 TOTAL NEGATIVE ENTRIES'] = formattedS['19 TOTAL NEGATIVE ENTRIES'][:10]
    formattedS['20 FILLER6'] = formattedS['20 FILLER6'][:90]

    #write to string
    strS = ''.join(formattedS.values())
    #print(len(strA))

    return strS

def processRowV(row):
    #ini dictionary
    formattedV = {}
    #enter data and justify
    formattedV['1 FILER LICENSE'] = f"{row[0].strip():<17}"
    formattedV['2 IDOR SCHEDULE TYPE'] = f"{row[1].strip():<3}"
    formattedV['3 FILER PERMIT KIND'] = f"{row[2].strip():<2}"
    formattedV['4 FILER LICENSEYEAR'] = f"{row[3].strip():<2}"
    formattedV['5 RECORD TYPE'] = f"{row[4].strip():<1}"
    formattedV['6 FILING INDICATOR'] = f"{row[5].strip():<1}"
    formattedV['7 FILER PETRODEX INDICATOR'] = f"{row[6].strip():<1}"
    formattedV['8 FILER NAME'] = f"{row[7].strip():<20}"
    formattedV['9 LIABILITY DATE'] = f"{row[8].strip():<4}"
    formattedV['10 FILLER'] = f"{row[9].strip():<5}"
    formattedV['11 FILLER2'] = f"{row[10].strip():<15}"
    formattedV['12 FILLER3'] = f"{row[11].strip():<15}"
    formattedV['13 FILLER4'] = f"{row[12].strip():<15}"
    formattedV['14 LICENSE NET GALLONS'] = f"{row[13].strip():<15}"
    formattedV['15 FILLER5'] = f"{row[14].strip():<10}"
    formattedV['16 TOTAL ORIGINAL ENTRIES'] = f"{row[15].strip():<10}"
    formattedV['17 TOTAL CORRECTION ENTRIES'] = f"{row[16].strip():<10}"
    formattedV['18 TOTAL REVERSAL ENTRIES'] = f"{row[17].strip():<10}"
    formattedV['19 TOTAL NEGATIVE ENTRIES'] = f"{row[18].strip():<10}"
    formattedV['20 FILLER6'] = f"{row[19].strip():<90}"

    #truncate if too large
    formattedV['1 FILER LICENSE'] = formattedV['1 FILER LICENSE'][:17]
    formattedV['2 IDOR SCHEDULE TYPE'] = formattedV['2 IDOR SCHEDULE TYPE'][:3]
    formattedV['3 FILER PERMIT KIND'] = formattedV['3 FILER PERMIT KIND'][:2]
    formattedV['4 FILER LICENSEYEAR'] = formattedV['4 FILER LICENSEYEAR'][:2]
    formattedV['5 RECORD TYPE'] = formattedV['5 RECORD TYPE'][:1]
    formattedV['6 FILING INDICATOR'] = formattedV['6 FILING INDICATOR'][:1]
    formattedV['7 FILER PETRODEX INDICATOR'] = formattedV['7 FILER PETRODEX INDICATOR'][:1]
    formattedV['8 FILER NAME'] = formattedV['8 FILER NAME'][:20]
    formattedV['9 LIABILITY DATE'] = formattedV['9 LIABILITY DATE'][:4]
    formattedV['10 FILLER'] = formattedV['10 FILLER'][:5]
    formattedV['11 FILLER2'] = formattedV['11 FILLER2'][:15]
    formattedV['12 FILLER3'] = formattedV['12 FILLER3'][:15]
    formattedV['13 FILLER4'] = formattedV['13 FILLER4'][:15]
    formattedV['14 LICENSE NET GALLONS'] = formattedV['14 LICENSE NET GALLONS'][:15]
    formattedV['15 FILLER5'] = formattedV['15 FILLER5'][:10]
    formattedV['16 TOTAL ORIGINAL ENTRIES'] = formattedV['16 TOTAL ORIGINAL ENTRIES'][:10]
    formattedV['17 TOTAL CORRECTION ENTRIES'] = formattedV['17 TOTAL CORRECTION ENTRIES'][:10]
    formattedV['18 TOTAL REVERSAL ENTRIES'] = formattedV['18 TOTAL REVERSAL ENTRIES'][:10]
    formattedV['19 TOTAL NEGATIVE ENTRIES'] = formattedV['19 TOTAL NEGATIVE ENTRIES'][:10]
    formattedV['20 FILLER6'] = formattedV['20 FILLER6'][:90]

    #write to string
    strV = ''.join(formattedV.values())
    #print(len(strA))

    return strV

def processRowZ(row):
    #ini dictionary
    formattedZ = {}
    #enter data and justify
    formattedZ['1 FILER LICENSE'] = f"{row[0].strip():<17}"
    formattedZ['2 IDOR SCHEDULE TYPE'] = f"{row[1].strip():<3}"
    formattedZ['3 FILER PERMIT KIND'] = f"{row[2].strip():<2}"
    formattedZ['4 FILER LICENSEYEAR'] = f"{row[3].strip():<2}"
    formattedZ['5 RECORD TYPE'] = f"{row[4].strip():<1}"
    formattedZ['6 FILING INDICATOR'] = f"{row[5].strip():<1}"
    formattedZ['7 FILER PETRODEX INDICATOR'] = f"{row[6].strip():<1}"
    formattedZ['8 FILER NAME'] = f"{row[7].strip():<20}"
    formattedZ['9 LIABILITY DATE'] = f"{row[8].strip():<4}"
    formattedZ['10 FILLER'] = f"{row[9].strip():<5}"
    formattedZ['11 FILLER2'] = f"{row[10].strip():<15}"
    formattedZ['12 FILLER3'] = f"{row[11].strip():<15}"
    formattedZ['13 FILLER4'] = f"{row[12].strip():<15}"
    formattedZ['14 LICENSE NET GALLONS'] = f"{row[13].strip():<15}"
    formattedZ['15 FILLER5'] = f"{row[14].strip():<10}"
    formattedZ['16 TOTAL ORIGINAL ENTRIES'] = f"{row[15].strip():<10}"
    formattedZ['17 TOTAL CORRECTION ENTRIES'] = f"{row[16].strip():<10}"
    formattedZ['18 TOTAL REVERSAL ENTRIES'] = f"{row[17].strip():<10}"
    formattedZ['19 TOTAL NEGATIVE ENTRIES'] = f"{row[18].strip():<10}"
    formattedZ['20 FILLER6'] = f"{row[19].strip():<90}"

    #truncate if too large
    formattedZ['1 FILER LICENSE'] = formattedZ['1 FILER LICENSE'][:17]
    formattedZ['2 IDOR SCHEDULE TYPE'] = formattedZ['2 IDOR SCHEDULE TYPE'][:3]
    formattedZ['3 FILER PERMIT KIND'] = formattedZ['3 FILER PERMIT KIND'][:2]
    formattedZ['4 FILER LICENSEYEAR'] = formattedZ['4 FILER LICENSEYEAR'][:2]
    formattedZ['5 RECORD TYPE'] = formattedZ['5 RECORD TYPE'][:1]
    formattedZ['6 FILING INDICATOR'] = formattedZ['6 FILING INDICATOR'][:1]
    formattedZ['7 FILER PETRODEX INDICATOR'] = formattedZ['7 FILER PETRODEX INDICATOR'][:1]
    formattedZ['8 FILER NAME'] = formattedZ['8 FILER NAME'][:20]
    formattedZ['9 LIABILITY DATE'] = formattedZ['9 LIABILITY DATE'][:4]
    formattedZ['10 FILLER'] = formattedZ['10 FILLER'][:5]
    formattedZ['11 FILLER2'] = formattedZ['11 FILLER2'][:15]
    formattedZ['12 FILLER3'] = formattedZ['12 FILLER3'][:15]
    formattedZ['13 FILLER4'] = formattedZ['13 FILLER4'][:15]
    formattedZ['14 LICENSE NET GALLONS'] = formattedZ['14 LICENSE NET GALLONS'][:15]
    formattedZ['15 FILLER5'] = formattedZ['15 FILLER5'][:10]
    formattedZ['16 TOTAL ORIGINAL ENTRIES'] = formattedZ['16 TOTAL ORIGINAL ENTRIES'][:10]
    formattedZ['17 TOTAL CORRECTION ENTRIES'] = formattedZ['17 TOTAL CORRECTION ENTRIES'][:10]
    formattedZ['18 TOTAL REVERSAL ENTRIES'] = formattedZ['18 TOTAL REVERSAL ENTRIES'][:10]
    formattedZ['19 TOTAL NEGATIVE ENTRIES'] = formattedZ['19 TOTAL NEGATIVE ENTRIES'][:10]
    formattedZ['20 FILLER6'] = formattedZ['20 FILLER6'][:90]

    #write to string
    strZ = ''.join(formattedZ.values())
    #print(len(strA))

    return strZ

def processRowA(row):
    #ini dictionary
    formattedA = {}
    #enter data and justify
    formattedA['1 FILER LICENSE'] = f"{row[0].strip():<17}"
    formattedA['2 IDOR SCHEDULE TYPE'] = f"{row[1].strip():<3}"
    formattedA['3 FILER PERMIT KIND'] = f"{row[2].strip():<2}"
    formattedA['4 FILER LICENSEYEAR'] = f"{row[3].strip():<2}"
    formattedA['5 RECORD TYPE'] = f"{row[4].strip():<1}"
    formattedA['6 FILING INDICATOR'] = f"{row[5].strip():<1}"
    formattedA['7 FILER PETRODEX INDICATOR'] = f"{row[6].strip():<1}"
    formattedA['8 FILER NAME'] = f"{row[7].strip():<20}"
    formattedA['9 LIABILITY DATE'] = f"{row[8].strip():<4}"
    formattedA['10 FILLER'] = f"{row[9].strip():<5}"
    formattedA['11 CARRIER CODE'] = f"{row[10].strip():<4}"
    formattedA['12 ORIGIN CODE'] = f"{row[11].strip():<6}"
    formattedA['13 DESTINATION CODE'] = f"{row[12].strip():<6}"
    formattedA['14 SELLER PETRODEX INDICATOR'] = f"{row[13].strip():<1}"
    formattedA['15 SELLER NAME'] = f"{row[14].strip():<20}"
    formattedA['16 SELLER LICENSE NUMBER'] = f"{row[15].strip():<20}"
    formattedA['17 INVOICE DATE'] = f"{row[16].strip():<6}"
    formattedA['18 INVOICE NUMBER'] = f"{row[17].strip():<12}"
    formattedA['19 BILL OF LADING DATE'] = f"{row[18].strip():<6}"
    formattedA['20 BILL OF LADING'] = f"{row[19].strip():<10}"
    formattedA['21 FILLER'] = f"{row[20].strip():<30}"
    formattedA['22 INVOICED GALLONS'] = f"{row[21].strip():<10}"
    formattedA['23 TAX TYPE'] = f"{row[22].strip():<1}"
    formattedA['24 STORAGE PERMIT INDICATOR'] = f"{row[23].strip():<1}"
    formattedA['25 PRODUCT CODE'] = f"{row[24].strip():<9}"
    formattedA['26 RECEIPT TYPE'] = f"{row[25].strip():<1}"
    formattedA['27 FILLER'] = f"{row[26].strip():<11}"
    formattedA['28 MEDIA CODE'] = f"{row[27].strip():<1}"
    formattedA['29 ORIGIN NAME'] = f"{row[28].strip():<15}"
    formattedA['30 DESTINATION NAME'] = f"{row[29].strip():<15}"
    formattedA['31 CARRIER NAME'] = f"{row[30].strip():<15}"

    #truncate if too large
    formattedA['1 FILER LICENSE'] = formattedA['1 FILER LICENSE'][:17]
    formattedA['2 IDOR SCHEDULE TYPE'] = formattedA['2 IDOR SCHEDULE TYPE'][:3]
    formattedA['3 FILER PERMIT KIND'] = formattedA['3 FILER PERMIT KIND'][:2]
    formattedA['4 FILER LICENSEYEAR'] = formattedA['4 FILER LICENSEYEAR'][:2]
    formattedA['5 RECORD TYPE'] = formattedA['5 RECORD TYPE'][:1]
    formattedA['6 FILING INDICATOR'] = formattedA['6 FILING INDICATOR'][:1]
    formattedA['7 FILER PETRODEX INDICATOR'] = formattedA['7 FILER PETRODEX INDICATOR'][:1]
    formattedA['8 FILER NAME'] = formattedA['8 FILER NAME'][:20]
    formattedA['9 LIABILITY DATE'] = formattedA['9 LIABILITY DATE'][:4]
    formattedA['10 FILLER'] = formattedA['10 FILLER'][:5]
    formattedA['11 CARRIER CODE'] = formattedA['11 CARRIER CODE'][:4]
    formattedA['12 ORIGIN CODE'] = formattedA['12 ORIGIN CODE'][:6]
    formattedA['13 DESTINATION CODE'] = formattedA['13 DESTINATION CODE'][:6]
    formattedA['14 SELLER PETRODEX INDICATOR'] = formattedA['14 SELLER PETRODEX INDICATOR'][:1]
    formattedA['15 SELLER NAME'] = formattedA['15 SELLER NAME'][:20]
    formattedA['16 SELLER LICENSE NUMBER'] = formattedA['16 SELLER LICENSE NUMBER'][:20]
    formattedA['17 INVOICE DATE'] = formattedA['17 INVOICE DATE'][:6]
    formattedA['18 INVOICE NUMBER'] = formattedA['18 INVOICE NUMBER'][:12]
    formattedA['19 BILL OF LADING DATE'] = formattedA['19 BILL OF LADING DATE'][:6]
    formattedA['20 BILL OF LADING'] = formattedA['20 BILL OF LADING'][:10]
    formattedA['21 FILLER'] = formattedA['21 FILLER'][:30]
    formattedA['22 INVOICED GALLONS'] = formattedA['22 INVOICED GALLONS'][:10]
    formattedA['23 TAX TYPE'] = formattedA['23 TAX TYPE'][:1]
    formattedA['24 STORAGE PERMIT INDICATOR'] = formattedA['24 STORAGE PERMIT INDICATOR'][:1]
    formattedA['25 PRODUCT CODE'] = formattedA['25 PRODUCT CODE'][:9]
    formattedA['26 RECEIPT TYPE'] = formattedA['26 RECEIPT TYPE'][:1]
    formattedA['27 FILLER'] = formattedA['27 FILLER'][:11]
    formattedA['28 MEDIA CODE'] = formattedA['28 MEDIA CODE'][:1]
    formattedA['29 ORIGIN NAME'] = formattedA['29 ORIGIN NAME'][:15]
    formattedA['30 DESTINATION NAME'] = formattedA['30 DESTINATION NAME'][:15]
    formattedA['31 CARRIER NAME'] = formattedA['31 CARRIER NAME'][:15]

    #write to string
    strA = ''.join(formattedA.values())
    #print(len(strA))

    return strA

def processRowD(row):
    #ini dictionary
    formattedD = {}
    #enter data and justify
    formattedD['1 FILER LICENSE'] = f"{row[0].strip():<17}"
    formattedD['2 IDOR SCHEDULE TYPE'] = f"{row[1].strip():<3}"
    formattedD['3 FILER PERMIT KIND'] = f"{row[2].strip():<2}"
    formattedD['4 FILER LICENSEYEAR'] = f"{row[3].strip():<2}"
    formattedD['5 RECORD TYPE'] = f"{row[4].strip():<1}"
    formattedD['6 FILING INDICATOR'] = f"{row[5].strip():<1}"
    formattedD['7 FILER PETRODEX INDICATOR'] = f"{row[6].strip():<1}"
    formattedD['8 FILER NAME'] = f"{row[7].strip():<20}"
    formattedD['9 LIABILITY DATE'] = f"{row[8].strip():<4}"
    formattedD['10 FILLER'] = f"{row[9].strip():<5}"
    formattedD['11 CARRIER CODE'] = f"{row[10].strip():<4}"
    formattedD['12 ORIGIN CODE'] = f"{row[11].strip():<6}"
    formattedD['13 DESTINATION CODE'] = f"{row[12].strip():<6}"
    formattedD['14 PURCHASER PETRODEX INDICATOR'] = f"{row[13].strip():<1}"
    formattedD['15 PURCHASER NAME'] = f"{row[14].strip():<20}"
    formattedD['16 PURCHASER LICENSE NUMBER'] = f"{row[15].strip():<20}"
    formattedD['17 INVOICE DATE'] = f"{row[16].strip():<6}"
    formattedD['18 INVOICE NUMBER'] = f"{row[17].strip():<12}"
    formattedD['19 BILL OF LADING DATE'] = f"{row[18].strip():<6}"
    formattedD['20 BILL OF LADING'] = f"{row[19].strip():<10}"
    formattedD['21 FILLER'] = f"{row[20].strip():<30}"
    formattedD['22 INVOICED GALLONS'] = f"{row[21].strip():<10}"
    formattedD['23 TAX TYPE'] = f"{row[22].strip():<1}"
    formattedD['24 STORAGE PERMIT INDICATOR'] = f"{row[23].strip():<1}"
    formattedD['25 PRODUCT CODE'] = f"{row[24].strip():<9}"
    formattedD['26 FILLER'] = f"{row[25].strip():<12}"
    formattedD['27 MEDIA CODE'] = f"{row[26].strip():<1}"
    formattedD['28 ORIGIN NAME'] = f"{row[27].strip():<15}"
    formattedD['29 DESTINATION NAME'] = f"{row[28].strip():<15}"
    formattedD['30 CARRIER NAME'] = f"{row[29].strip():<15}"

    #truncate if too large
    formattedD['1 FILER LICENSE'] = formattedD['1 FILER LICENSE'][:17]
    formattedD['2 IDOR SCHEDULE TYPE'] = formattedD['2 IDOR SCHEDULE TYPE'][:3]
    formattedD['3 FILER PERMIT KIND'] = formattedD['3 FILER PERMIT KIND'][:2]
    formattedD['4 FILER LICENSEYEAR'] = formattedD['4 FILER LICENSEYEAR'][:2]
    formattedD['5 RECORD TYPE'] = formattedD['5 RECORD TYPE'][:1]
    formattedD['6 FILING INDICATOR'] = formattedD['6 FILING INDICATOR'][:1]
    formattedD['7 FILER PETRODEX INDICATOR'] = formattedD['7 FILER PETRODEX INDICATOR'][:1]
    formattedD['8 FILER NAME'] = formattedD['8 FILER NAME'][:20]
    formattedD['9 LIABILITY DATE'] = formattedD['9 LIABILITY DATE'][:4]
    formattedD['10 FILLER'] = formattedD['10 FILLER'][:5]
    formattedD['11 CARRIER CODE'] = formattedD['11 CARRIER CODE'][:4]
    formattedD['12 ORIGIN CODE'] = formattedD['12 ORIGIN CODE'][:6]
    formattedD['13 DESTINATION CODE'] = formattedD['13 DESTINATION CODE'][:6]
    formattedD['14 PURCHASER PETRODEX INDICATOR'] = formattedD['14 PURCHASER PETRODEX INDICATOR'][:1]
    formattedD['15 PURCHASER NAME'] = formattedD['15 PURCHASER NAME'][:20]
    formattedD['16 PURCHASER LICENSE NUMBER'] = formattedD['16 PURCHASER LICENSE NUMBER'][:20]
    formattedD['17 INVOICE DATE'] = formattedD['17 INVOICE DATE'][:6]
    formattedD['18 INVOICE NUMBER'] = formattedD['18 INVOICE NUMBER'][:12]
    formattedD['19 BILL OF LADING DATE'] = formattedD['19 BILL OF LADING DATE'][:6]
    formattedD['20 BILL OF LADING'] = formattedD['20 BILL OF LADING'][:10]
    formattedD['21 FILLER'] = formattedD['21 FILLER'][:30]
    formattedD['22 INVOICED GALLONS'] = formattedD['22 INVOICED GALLONS'][:10]
    formattedD['23 TAX TYPE'] = formattedD['23 TAX TYPE'][:1]
    formattedD['24 STORAGE PERMIT INDICATOR'] = formattedD['24 STORAGE PERMIT INDICATOR'][:1]
    formattedD['25 PRODUCT CODE'] = formattedD['25 PRODUCT CODE'][:9]
    formattedD['26 FILLER'] = formattedD['26 FILLER'][:12]
    formattedD['27 MEDIA CODE'] = formattedD['27 MEDIA CODE'][:1]
    formattedD['28 ORIGIN NAME'] = formattedD['28 ORIGIN NAME'][:15]
    formattedD['29 DESTINATION NAME'] = formattedD['29 DESTINATION NAME'][:15]
    formattedD['30 CARRIER NAME'] = formattedD['30 CARRIER NAME'][:15]

    #write to string
    strD = ''.join(formattedD.values())
    #print(len(strA))

    return strD

def processRowDA(row):
    #ini dictionary
    formattedDA = {}
    #enter data and justify
    formattedDA['1 FILER LICENSE'] = f"{row[0].strip():<17}"
    formattedDA['2 IDOR SCHEDULE TYPE'] = f"{row[1].strip():<3}"
    formattedDA['3 FILER PERMIT KIND'] = f"{row[2].strip():<2}"
    formattedDA['4 FILER LICENSEYEAR'] = f"{row[3].strip():<2}"
    formattedDA['5 RECORD TYPE'] = f"{row[4].strip():<1}"
    formattedDA['6 FILING INDICATOR'] = f"{row[5].strip():<1}"
    formattedDA['7 FILER PETRODEX INDICATOR'] = f"{row[6].strip():<1}"
    formattedDA['8 FILER NAME'] = f"{row[7].strip():<20}"
    formattedDA['9 LIABILITY DATE'] = f"{row[8].strip():<4}"
    formattedDA['10 FILLER'] = f"{row[9].strip():<5}"
    formattedDA['11 CARRIER CODE'] = f"{row[10].strip():<4}"
    formattedDA['12 ORIGIN CODE'] = f"{row[11].strip():<6}"
    formattedDA['13 DESTINATION CODE'] = f"{row[12].strip():<6}"
    formattedDA['14 SELLER PETRODEX INDICATOR'] = f"{row[13].strip():<1}"
    formattedDA['15 SELLER NAME'] = f"{row[14].strip():<20}"
    formattedDA['16 SELLER LICENSE NUMBER'] = f"{row[15].strip():<20}"
    formattedDA['17 INVOICE DATE'] = f"{row[16].strip():<6}"
    formattedDA['18 INVOICE NUMBER'] = f"{row[17].strip():<12}"
    formattedDA['19 BILL OF LADING DATE'] = f"{row[18].strip():<6}"
    formattedDA['20 BILL OF LADING'] = f"{row[19].strip():<10}"
    formattedDA['21 FILLER'] = f"{row[20].strip():<30}"
    formattedDA['22 INVOICED GALLONS'] = f"{row[21].strip():<10}"
    formattedDA['23 TAX TYPE'] = f"{row[22].strip():<1}"
    formattedDA['24 PRODUCT CODE'] = f"{row[23].strip():<10}"
    formattedDA['25 RECEIPT TYPE'] = f"{row[24].strip():<1}"
    formattedDA['26 FILLER'] = f"{row[25].strip():<11}"
    formattedDA['27 MEDIA CODE'] = f"{row[26].strip():<1}"
    formattedDA['28 ORIGIN NAME'] = f"{row[27].strip():<15}"
    formattedDA['29 DESTINATION NAME'] = f"{row[28].strip():<15}"
    formattedDA['30 CARRIER NAME'] = f"{row[30].strip():<15}"

    #truncate if too large
    formattedDA['1 FILER LICENSE'] = formattedDA['1 FILER LICENSE'][:17]
    formattedDA['2 IDOR SCHEDULE TYPE'] = formattedDA['2 IDOR SCHEDULE TYPE'][:3]
    formattedDA['3 FILER PERMIT KIND'] = formattedDA['3 FILER PERMIT KIND'][:2]
    formattedDA['4 FILER LICENSEYEAR'] = formattedDA['4 FILER LICENSEYEAR'][:2]
    formattedDA['5 RECORD TYPE'] = formattedDA['5 RECORD TYPE'][:1]
    formattedDA['6 FILING INDICATOR'] = formattedDA['6 FILING INDICATOR'][:1]
    formattedDA['7 FILER PETRODEX INDICATOR'] = formattedDA['7 FILER PETRODEX INDICATOR'][:1]
    formattedDA['8 FILER NAME'] = formattedDA['8 FILER NAME'][:20]
    formattedDA['9 LIABILITY DATE'] = formattedDA['9 LIABILITY DATE'][:4]
    formattedDA['10 FILLER'] = formattedDA['10 FILLER'][:5]
    formattedDA['11 CARRIER CODE'] = formattedDA['11 CARRIER CODE'][:4]
    formattedDA['12 ORIGIN CODE'] = formattedDA['12 ORIGIN CODE'][:6]
    formattedDA['13 DESTINATION CODE'] = formattedDA['13 DESTINATION CODE'][:6]
    formattedDA['14 SELLER PETRODEX INDICATOR'] = formattedDA['14 SELLER PETRODEX INDICATOR'][:1]
    formattedDA['15 SELLER NAME'] = formattedDA['15 SELLER NAME'][:20]
    formattedDA['16 SELLER LICENSE NUMBER'] = formattedDA['16 SELLER LICENSE NUMBER'][:20]
    formattedDA['17 INVOICE DATE'] = formattedDA['17 INVOICE DATE'][:6]
    formattedDA['18 INVOICE NUMBER'] = formattedDA['18 INVOICE NUMBER'][:12]
    formattedDA['19 BILL OF LADING DATE'] = formattedDA['19 BILL OF LADING DATE'][:6]
    formattedDA['20 BILL OF LADING'] = formattedDA['20 BILL OF LADING'][:10]
    formattedDA['21 FILLER'] = formattedDA['21 FILLER'][:30]
    formattedDA['22 INVOICED GALLONS'] = formattedDA['22 INVOICED GALLONS'][:10]
    formattedDA['23 TAX TYPE'] = formattedDA['23 TAX TYPE'][:1]
    formattedDA['24 PRODUCT CODE'] = formattedDA['24 PRODUCT CODE'][:10]
    formattedDA['25 RECEIPT TYPE'] = formattedDA['25 RECEIPT TYPE'][:1]
    formattedDA['26 FILLER'] = formattedDA['26 FILLER'][:11]
    formattedDA['27 MEDIA CODE'] = formattedDA['27 MEDIA CODE'][:1]
    formattedDA['28 ORIGIN NAME'] = formattedDA['29 ORIGIN NAME'][:15]
    formattedDA['29 DESTINATION NAME'] = formattedDA['30 DESTINATION NAME'][:15]
    formattedDA['30 CARRIER NAME'] = formattedDA['30 CARRIER NAME'][:15]

    #write to string
    strDA = ''.join(formattedDA.values())
    #print(len(strA))

    return strDA

def processRowMG(row):
    #ini dictionary
    formattedMG = {}
    #enter data and justify
    formattedMG['1 FILER LICENSE'] = f"{row[0].strip():<17}"
    formattedMG['2 IDOR SCHEDULE TYPE'] = f"{row[1].strip():<3}"
    formattedMG['3 FILER PERMIT KIND'] = f"{row[2].strip():<2}"
    formattedMG['4 FILER LICENSEYEAR'] = f"{row[3].strip():<2}"
    formattedMG['5 RECORD TYPE'] = f"{row[4].strip():<1}"
    formattedMG['6 FILING INDICATOR'] = f"{row[5].strip():<1}"
    formattedMG['7 FILER PETRODEX INDICATOR'] = f"{row[6].strip():<1}"
    formattedMG['8 FILER NAME'] = f"{row[7].strip():<20}"
    formattedMG['9 LIABILITY DATE'] = f"{row[8].strip():<4}"
    formattedMG['10 FILLER'] = f"{row[9].strip():<5}"
    formattedMG['11 CARRIER CODE'] = f"{row[10].strip():<4}"
    formattedMG['12 ORIGIN CODE'] = f"{row[11].strip():<6}"
    formattedMG['13 DESTINATION CODE'] = f"{row[12].strip():<6}"
    formattedMG['14 FILLER'] = f"{row[13].strip():<1}"
    formattedMG['15 PURCHASER NAME'] = f"{row[14].strip():<20}"
    formattedMG['16 PURCHASER LICENSE NUMBER'] = f"{row[15].strip():<20}"
    formattedMG['17 INVOICE DATE'] = f"{row[16].strip():<6}"
    formattedMG['18 INVOICE NUMBER'] = f"{row[17].strip():<12}"
    formattedMG['19 BLENDING DATE'] = f"{row[18].strip():<6}"
    formattedMG['20 END PRODUCT CODE'] = f"{row[19].strip():<9}"
    formattedMG['21 FILLER'] = f"{row[20].strip():<1}"
    formattedMG['22 FILLER'] = f"{row[21].strip():<30}"
    formattedMG['23 END PRODUCT GALLONS'] = f"{row[22].strip():<10}"
    formattedMG['24 FILLER'] = f"{row[23].strip():<1}"
    formattedMG['25 FILLER'] = f"{row[24].strip():<1}"
    formattedMG['26 PRIMARY PRODUCT CODE'] = f"{row[25].strip():<9}"
    formattedMG['27 FILLER'] = f"{row[26].strip():<1}"
    formattedMG['28 PRIMARY PRODUCT GALLONS'] = f"{row[27].strip():<10}"
    formattedMG['29 FILLER'] = f"{row[28].strip():<1}"
    formattedMG['30 MEDIA CODE'] = f"{row[29].strip():<1}"
    formattedMG['31 BLENDING AGENT GALLONS'] = f"{row[30].strip():<10}"
    formattedMG['32 BLENDING AGENT GALLONS'] = f"{row[31].strip():<10}"
    formattedMG['33 BLENDING AGENT PRODUCT'] = f"{row[32].strip():<9}"
    formattedMG['34 BLENDING AGENT OTHER'] = f"{row[33].strip():<10}"
    formattedMG['35 FILLER'] = f"{row[34].strip():<6}"

    #truncate if too large
    formattedMG['1 FILER LICENSE'] = formattedMG['1 FILER LICENSE'][:17]
    formattedMG['2 IDOR SCHEDULE TYPE'] = formattedMG['2 IDOR SCHEDULE TYPE'][:3]
    formattedMG['3 FILER PERMIT KIND'] = formattedMG['3 FILER PERMIT KIND'][:2]
    formattedMG['4 FILER LICENSEYEAR'] = formattedMG['4 FILER LICENSEYEAR'][:2]
    formattedMG['5 RECORD TYPE'] = formattedMG['5 RECORD TYPE'][:1]
    formattedMG['6 FILING INDICATOR'] = formattedMG['6 FILING INDICATOR'][:1]
    formattedMG['7 FILER PETRODEX INDICATOR'] = formattedMG['7 FILER PETRODEX INDICATOR'][:1]
    formattedMG['8 FILER NAME'] = formattedMG['8 FILER NAME'][:20]
    formattedMG['9 LIABILITY DATE'] = formattedMG['9 LIABILITY DATE'][:4]
    formattedMG['10 FILLER'] = formattedMG['10 FILLER'][:5]
    formattedMG['11 CARRIER CODE'] = formattedMG['11 CARRIER CODE'][:4]
    formattedMG['12 ORIGIN CODE'] = formattedMG['12 ORIGIN CODE'][:6]
    formattedMG['13 DESTINATION CODE'] = formattedMG['13 DESTINATION CODE'][:6]
    formattedMG['14 FILLER'] = formattedMG['14 FILLER'][:1]
    formattedMG['15 PURCHASER NAME'] = formattedMG['15 PURCHASER NAME'][:20]
    formattedMG['16 PURCHASER LICENSE NUMBER'] = formattedMG['16 PURCHASER LICENSE NUMBER'][:20]
    formattedMG['17 INVOICE DATE'] = formattedMG['17 INVOICE DATE'][:6]
    formattedMG['18 INVOICE NUMBER'] = formattedMG['18 INVOICE NUMBER'][:12]
    formattedMG['19 BLENDING DATE'] = formattedMG['19 BLENDING DATE'][:6]
    formattedMG['20 END PRODUCT CODE'] = formattedMG['20 END PRODUCT CODE'][:9]
    formattedMG['21 FILLER'] = formattedMG['21 FILLER'][:1]
    formattedMG['22 FILLER'] = formattedMG['22 FILLER'][:30]
    formattedMG['23 END PRODUCT GALLONS'] = formattedMG['23 END PRODUCT GALLONS'][:10]
    formattedMG['24 FILLER'] = formattedMG['24 FILLER'][:1]
    formattedMG['25 FILLER'] = formattedMG['25 FILLER'][:1]
    formattedMG['26 PRIMARY PRODUCT CODE'] = formattedMG['26 PRIMARY PRODUCT CODE'][:9]
    formattedMG['27 FILLER'] = formattedMG['27 FILLER'][:1]
    formattedMG['28 PRIMARY PRODUCT GALLONS'] = formattedMG['28 PRIMARY PRODUCT GALLONS'][:10]
    formattedMG['29 FILLER'] = formattedMG['29 FILLER'][:1]
    formattedMG['30 MEDIA CODE'] = formattedMG['30 MEDIA CODE'][:1]
    formattedMG['31 BLENDING AGENT GALLONS'] = formattedMG['31 BLENDING AGENT GALLONS'][:10]
    formattedMG['32 BLENDING AGENT GALLONS'] = formattedMG['32 BLENDING AGENT GALLONS'][:10]
    formattedMG['33 BLENDING AGENT PRODUCT'] = formattedMG['33 BLENDING AGENT PRODUCT'][:9]
    formattedMG['34 BLENDING AGENT OTHER'] = formattedMG['32 BLENDING AGENT OTHER'][:10]
    formattedMG['35 FILLER'] = formattedMG['35 FILLER'][:6]

    #write to string
    strMG = ''.join(formattedMG.values())
    #print(len(strA))

    return strMG

def writeFile(data):
    #make new file path and check for if exists
    newpath = os.path.splitext(filename)[0]
    propnew = newpath
    idx = 1
    
    if os.path.exists(newpath + ".prn"):
        #try new names
        propnew += '(1)'
        while os.path.exists(propnew + ".prn"):
            idx += 1
            propnew = f'{newpath}({idx})'
            #give copy name
        newpath += f'({idx}).prn'
        print(newpath)
    else:
        #give unique name
        newpath += '.prn'

    

    #write file
    with open(newpath, 'w') as newfile:
        data = '\n'.join(data)
        newfile.write(data)

        newfile.close()
        print(f'File written to: {newpath} \n Using program version: V{version}')







if __name__ == "__main__":
    main()