input("This code requires python 3.5 to run. Press enter to join the chat.")
import asyncio, json, socket, json, urllib
from urllib import request, parse


class Radio:
    def __init__(self, responder, port=8888):
        self.responder = responder
        self.port = port

    def encode(self, data):
        return bytes(json.dumps(data), encoding="utf-8")

    async def handle_conn(self, reader):
        data = []
        while True:
            packet = await reader.read(1024)
            data.append(packet.decode("utf-8"))
            if len(packet) < 1024:
                break
        data = json.loads("".join(data))
        return data

    async def send(self, message, addr):
        reader, writer = await asyncio.open_connection(addr, self.port)
        encoded = self.encode(message)
        writer.write(encoded)
        data = await self.handle_conn(reader)
        writer.close()
        return data

    async def send_all(self, ipaddr_list, message):
        replies = []
        for addr in ipaddr_list:
            replies.append(asyncio.wait_for(self.send(message, addr), timeout=.2))
        responses = await asyncio.gather(*replies, return_exceptions=True)
        return responses

    async def nquery(self, reader, writer):
        addr = writer.get_extra_info('peername')
        data = await self.handle_conn(reader)
        reply = self.responder(data, addr)
        if not reply: reply = "no reply provided"
        writer.write(self.encode(reply))
        await writer.drain()
        writer.close()

    async def sentry(self):
        server = await asyncio.start_server(self.nquery, "0.0.0.0", self.port)
        async with server:
            await server.serve_forever()

def save_info(name, adress):
    data = parse.urlencode({'1000001':name,'1000002':adress}).encode()
    req =  request.Request('https://na3.ragic.com/leafpte/ragicsales/1?api', data=data) # this will make the method "POST"
    return request.urlopen(req)

def get_info():
    response = request.urlopen("https://na3.ragic.com/leafpte/ragicsales/1?api")
    resp = json.load(response)
    table = [["Name", "Adress"]]
    for entry in resp.keys():
        table.append([resp[entry]["Name"],resp[entry]["Adress"]])
    return table

async def ginput(m):
    return await asyncio.get_event_loop().run_in_executor(None, input, m)

def responder(data, addr):
    if addr != ip: print("\r", end="")
    index = ips.index(addr[0])
    name = names[index+1]
    print(f"{name}: {data}     ")
    return "recieved"

async def main():
    while True:
        prompt = await ginput("")
        await SERVER.send_all(ips, prompt)

async def booter():
    await asyncio.gather(SERVER.sentry(), main())

def mains():
    print("CLI")
name = socket.gethostname()
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.connect(("8.8.8.8", 80))
    ip = s.getsockname()[0]

SERVER = Radio(responder)
comrades = get_info()
names, ips = zip(*comrades)
ips = ips[1:len(ips)]
if ip not in ips: save_info(name, ip)
asyncio.run(booter())

