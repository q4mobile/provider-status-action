# provider-status-action

A GitHub Action for checking providers/vendors/services statuses before deploying

## Currently supported services

- AWS
- Atlassian
- Auth0
- CloudFlare
- DataDog
- GitHub
- HashiCorp
- Heroku
- MongoDB Atlas
- NewRelic
- NpmJs
- Pendo
- SendGrid
- Sentry
- SnowFlake
- Twilio

## Inputs

- `fail_on_warning` - stops workflow run on "warning" status (default: `false`)

- `provider` - multline list of services
## Example

You may provide as many services as you'd like, in this fashion:

```yaml
      - name: Providers status
        uses: gardarik/provider-status-action@v1.0.0
        with:
          providers: |
            aws.appstream2-us-east-1
            aws.apigateway-us-east-1
            aws.route53privatedns-us-east-1
            mongodb
            auth0.1612668
```

## Result

### Configuration
```yaml
        with:
          providers: |
            aws.appstream2-us-east-1
            aws.apigateway-us-east-1
            aws.route53privatedns-us-east-1
            auth0.1612668
            mongodb
            mongodb.4343523
```
### Output
![image](https://user-images.githubusercontent.com/45370035/126528768-c11c0e15-cf26-4f62-9516-07aa319018c0.png)
## Services

---
- ### AWS ###

  URL for reference: https://status.aws.amazon.com/

  **Syntax**
  ```yaml
      aws.<subservice-name>
  ```
  where `subservice-name` is a part of RSS url(s) from https://status.aws.amazon.com/ 

  https://status.aws.amazon.com/rss/(subservice-name).rss

  **Example**

   - https://status.aws.amazon.com/rss/apigateway-us-east-1.rss -> `aws.apigateway-us-east-1`
   - https://status.aws.amazon.com/rss/elasticsearch-eu-west-1.rss -> `aws.elasticsearch-eu-west-1` 
---
- ### MongoDB ###

  URL for reference: http://status.mongodb.com/

  **Syntax**
  ```yaml
      mongo # "cloud.mongodb.com" by default
      mongo.<subservice-id>
  ```
  
  where `subservice-id` is a numeric part of the link from http://status.mongodb.com/

  http://status.mongodb.com/(subservice-id)

  **Example**

   - http://status.mongodb.com/1303731 -> `mongodb.1303731`
  
---
- ### Auth0 ###

  URL for reference: http://uptime.auth0.com/

  **Syntax**
  ```yaml
      auth0 # "auth0 login" by default
      auth0.<subservice-id>
  ```
  where `subservice-id` is a numeric part of the link from http://uptime.auth0.com/

  http://uptime.auth0.com/(subservice-id)

  **Example**

   - http://uptime.auth0.com/1612668 -> `auth0.1612668`
  
---
- ### DataDog ###

  URL for reference: https://status.datadoghq.com/

  **Syntax**
  ```yaml
      datadog # All systems
  ```

---
- ### Heroku ###

  URL for reference: https://status.heroku.com/

  **Syntax**
  ```yaml
      heroku # All: Apps/Data/Tools
      heroku.apps # Apps
      heroku.tools # Tools
      heroku.data # Data
  ```      
---
- ### HashiCorp ###

  URL for reference: https://status.hashicorp.com/

  **Syntax**
  ```yaml
      hashicorp # All systems
  ```

---
- ### Newrelic ###

  URL for reference: https://status.newrelic.com/

  **Syntax**
  ```yaml
      newrelic # All systems
  ```
---
- ### Pendo ###

  URL for reference: https://status.pendo.io/

  **Syntax**
  ```yaml
      pendo # All systems
  ```
---
- ### SendGrid ###

  URL for reference: https://status.sendgrid.com/

  **Syntax**
  ```yaml
      sendgrid # All systems
  ```
---
- ### Sentry ###

  URL for reference: https://status.sentry.io/

  **Syntax**
  ```yaml
      sentry # All systems
  ```
---
- ### Twilio ###

  URL for reference: https://status.twilio.com/

  **Syntax**
  ```yaml
      twilio # All systems
  ```
---

- ### Atlassian ###

  URL for reference: https://status.atlassian.com/

  **Syntax**
  ```yaml
      atlassian # All systems
  ```
---
- ### CloudFlare ###

  URL for reference: https://www.cloudflarestatus.com/

  **Syntax**
  ```yaml
      cloudflare # All systems
  ```

---
- ### Github ###

  URL for reference: https://www.githubstatus.com//

  **Syntax**
  ```yaml
      github # All systems
  ```
---
- ### SnowFlake ###

  URL for reference: https://status.snowflake.com/

  **Syntax**
  ```yaml
      snowflake # All systems
  ```
- ### NPMJS ###

  URL for reference: https://status.npmjs.org/

  **Syntax**
  ```yaml
      npmjs # All systems
  ```