
## Setup The Test Environment

## Global stuff, NSPs

1. make sure you are in the test project
```console
oc project ...-test
```

2. Switch Apporeto to Kubernetes network policy
Make sure you're in test:
```console
oc get nsp
```
And obtain name (such as builder-to-internet), and delete it, ie:
```console
oc delete nsp pppp-to-address-service pppp-to-captcha-service pppp-to-msp-service pppp-to-spa-env-server pppp-to-splunk-forwarder address-service-to-address-doctor msp-service-to-cloudflare msp-service-to-maximus-servers msp-service-to-splunk-forwarder pppp-to-address-service pppp-to-captcha-service pppp-to-msp-service  pppp-to-spa-env-server pppp-to-splunk-forwarder splunk-forwarder-to-cloudflare splunk-forwarder-to-maximus-servers
```

Same with endpoints:
```console
oc get en
```
And obtain names, then delete, ie:
```console
oc delete en addressdoctor cloudflare maximus-servers
```

3. apply the quickstart pppp web (for test, make sure your default oc project is test):
cd /openshift/templates
```console
oc process -f quickppppweb-toall.yaml NAMESPACE=0752cb-test | oc apply -f -
```

To check things out:
The oc process should have created 3 networkpolicies and 2 network security policies.  To check them:
oc get networkPolicy
NAME                              POD-SELECTOR           AGE
allow-all-internal                <none>                 47h
allow-from-openshift-ingress      <none>                 23h
deny-by-default                   <none>                 23h
msp-service-to-splunk-forwarder   role=splunkforwarder   23h
pppp-to-address-service            role=addressservice    23h
pppp-to-captcha-service            role=captchaservice    23h
pppp-to-msp-service                role=mspservice        23h
pppp-to-spa-env-server             role=spaenv            23h
pppp-to-splunk-forwarder           role=splunkforwarder   23h
oc get nsp
NAME              AGE
any-to-any        8m23s
any-to-external   47h


4. allow the test project to pull from tools:
   Go to the test project (oc project 0752cb-test).
```console
oc policy add-role-to-user system:image-puller system:serviceaccount:$(oc project --short):default -n 0752cb-tools
```

## For each of the nodeJS apps, ie. splunk-forwarder, msp-service, captcha-service, spa-env-server
## (for example spa-env-server)

1. go to spa-env-server/openshift/templates

2. create the params-test.txt file, fill the env variables from openshift 3 env values for spa-env-server

3. create the trio of dc, service, routes using the deploy.yaml file:
```console
oc process -f deploy.yaml --param-file=params-test.txt | oc apply -f -
```

## deal with the github workflows

1. go to the top level's .github directory

2. go to the workflow directory

3. check that everything in the deploy to test action is correct.

4. go to github, then actions, then try it.


## For the PPPP application

1. go to the pppp directory

2. go to openshift/templates

3. create the params-test.txt file, fill the env variables from openshift 3 env values for spa-env-server

4. create the config artifact in the test project by doing an oc process on config.yaml
```console
oc process -f openshift/templates/config.yaml --param-file=params-test.txt | oc apply -f -
```
5. create the trio of dc, service, routes using the deploy.yaml file:
```console
oc process -f openshift/templates/deploy.yaml --param-file=params-test.txt | oc apply -f -
```

## some checks in the new test environment (and compare with dev):

1. check the dc's
   oc get dc
   oc describe dc/spa-env-server...

   pay attention to roles, make sure they're ok.
   in cases of not working, delete the objects and recreate.

2. check the config
   use console?

3. check the nsp
   oc get nsp
   oc get nsp ... -o yaml

   pay attention to roles.
   in cases of not working, delete the objects and recreate.

4. check the external networks
   oc get ne
   oc get ns ... -o yaml

5. check secrets
   oc get secrets

