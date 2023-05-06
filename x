oscOut = op('oscout2')
numberOfBlobs = op('numberOfBlobs')['chan1']
fogNear = op('fogNear')['chan1']
fogFar = op('fogFar')['chan1']
lerpFactor = op('lerpFactor')['chan1']
blobGroupZposition = op('blobGroupZposition')['chan1']


def onSetupParameters(scriptOp):
	return

# called whenever custom pulse parameter is pushed
def onPulse(par):
	return

def onCook(scriptOp):
	scriptOp.clear()
	paramsToSend = [blobGroupZposition, numberOfBlobs, fogNear, fogFar, lerpFactor]
	oscOut.sendOSC('/msg', paramsToSend)
	print('sent msg')
	return 

