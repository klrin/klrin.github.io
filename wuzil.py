

import requests, json, decimal


status_codes = {
    200 : "Everything went okay, and the result has been returned [if any].",
    301 : "The server is redirecting you to a different endpoint. This can happen when a company switches domain names, or an endpoint name is changed.",
    400 : "The server thinks you made a bad request. This can happen when you don’t send along the right data, among other things.",
    401 : "The server thinks you’re not authenticated. Many APIs require login credentials, so this happens when you don’t send the right credentials to access an API.",
    403 : "The resource you’re trying to access is forbidden: you don’t have the right permissions to see it.",
    404 : "The resource you tried to access wasn’t found on the server.",
    503 : "The server is not ready to handle the request.",
}

# openweathermap.org
weaurl = "https://api.openweathermap.org/data/2.5/weather"
weapara = {
    "zip" : 94556,
    "appid" : "d8a87ceaa7583bc39640165971548210"
}
weadata = ""
# purpleair.com
airurl = "https://www.purpleair.com/json"
air1para = {"show":86911}
air2para = {"show":83745}
air1data = ""
air2data = ""
#system variables
error = False
localdata = {}
wreport = ""
running = True
paused = False
temp = ""

def jprint(jsondata):
    text = json.dumps(jsondata, sort_keys=True, indent=4)
    print(text)

def getdata():
    print("Getting data...")
    global weadata, air1data, air2data, error, weaurl, airurl, weapara, air1para, air2para
    try:
        weadata = requests.get(weaurl, params = weapara)
        air1data = requests.get(airurl, params = air1para)
        air2data = requests.get(airurl, params = air2para)
    except Exception as e:
        error = "could not contact the servers. Make sure you are connected to the internet, no firewalls are blocking access, ect.."
        return False
    if weadata.status_code != 200 or air1data.status_code != 200 or air2data.status_code != 200:
        error = "a server returned a bad status code"
        if weadata.status_code != 200:
            error += "\nopenweathermap.org returned status code "+weadata.status_code+" ("+status_codes.get(weadata.status_code, "unknown meaning")+")"
        if air1data.status_code != 200:
            error += "\npurpleair.com sensor 1 returned status code "+air1data.status_code+" ("+status_codes.get(air1data.status_code, "unknown meaning")+")"
        if air2data.status_code != 200:
            error += "\npurpleair.com sensor 2 returned status code "+air2data.status_code+" ("+status_codes.get(air2data.status_code, "unknown meaning")+")"
        return False
    return True

def parsewea(y): # y is weather raw json data
    global error, paused
    if paused:
        return True
    print("Parsing weather data...", end="\r")

    try:
        wdesc = y["weather"][0]["description"]
        wctemp = y["main"]["temp"]
        wfltemp = y["main"]["feels_like"]
        wpress = y["main"]["pressure"]
        whum = y["main"]["humidity"]
        wviz = y["visibility"]
        wwind = y["wind"]["speed"]
        wgust = y["wind"]["gust"]
        wloc = y["name"]
    except Exception as e:
        error = "could not parse data from openweathermap.org"
        return False
    wctemp = round(decimal.Decimal((wctemp-273.15)*1.8+32), 1)
    wfltemp = round(decimal.Decimal((wfltemp-273.15)*1.8+32), 1)
    return wdesc, wctemp, wfltemp, wpress, whum, wviz, wwind, wgust, wloc
def parseair(y, z): # y is json
    pmstring = str(y["results"][0]["Stats"])
    print(pmstring)
    return



while running:
    #User prompt
    userresponse = input("Welcome to Wuzil! Hit i for info, q to quit, l for a list of weather stats, and any other key for the weather report.\n>>>")
    if userresponse == "q":
        print("Thanks for using Wuzil!")
        running = False
    #Getting data from servers
    if getdata() == False:
        print("Error: "+ error)
        paused = True
        print("Restarting...")
    #parsing the weather data
    temp = parsewea(weadata.json())
    if temp == False:
        print("Error: "+ error)
        paused = True
        print("Restarting...")
    elif temp != True:
        a, b, c, d, e, f, g, h, i = temp
        localdata["weather description"] = a
        localdata["temperature"] = b
        localdata["feels-like temperature"] = c
        localdata["air pressure"] = d
        localdata["humidity"] = e
        localdata["visibility"] = f
        localdata["wind speed"] = g
        localdata["gust speed"] = h
        localdata["location"] = i
    # parsing air quality 1
    parseair(air1data.json(), air2data.json())


















#lll
