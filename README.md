# IVA360 DEV

- [x] Nuxt 4
- [x] Tailwind CSS 4
- [x] Shadcn Vue
- [x] Custom Fonts
- [x] Basic Auth Protection
- [ ] HomePage

## Basic Auth Configuration

For production deployment, create a `.env` file with the following variables:

```env
# Basic Auth Configuration for Production
BASIC_AUTH_USERNAME=your_username
BASIC_AUTH_PASSWORD=your_secure_password

# Node Environment
NODE_ENV=production
```

The Basic Auth protection is automatically enabled only in production mode (`NODE_ENV=production`). In development mode, the site is accessible without authentication.

## Testing Basic Auth

To test the Basic Auth functionality:

1. Build the project: `npm run build`
2. Set environment variables for production:
   ```bash
   export NODE_ENV=production
   export BASIC_AUTH_USERNAME=testuser
   export BASIC_AUTH_PASSWORD=testpass
   ```
3. Start the production server: `node .output/server/index.mjs`
4. Access the site - you should see a browser authentication prompt
5. Enter the credentials you set in step 2

The middleware will:
- Skip authentication in development mode
- Require Basic Auth credentials in production mode
- Return 401 status with appropriate headers for unauthorized requests
- Allow access when correct credentials are provided