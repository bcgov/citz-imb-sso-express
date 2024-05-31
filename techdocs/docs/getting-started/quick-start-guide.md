# Quick Start Guide

Set up in 2 steps. 

### 1. Initialize with Express App 

Add import for [sso] to the file that defines the express app.  
Add `sso(app);` below the definition of the express app, where `app` is defined by `express()`.

#### `Import Examples:`

```JavaScript
// ESModule import (preferred).
import { sso } from '@bcgov/citz-imb-sso-express';

// CommonJS import.
const { sso } = require('@bcgov/citz-imb-sso-express');
```

#### `Use Example:`

```JavaScript
import express, { Application } from 'express';
import { sso } from '@bcgov/citz-imb-sso-express';

// Define Express App.
const app = express();

// Initialize sso(app: Application, options?: SSOOptions).
sso(app);
```

!!! note "Note"
    sso() has optional props that can be customized through `SSOOPTIONS`.
    See [Initialization Options](../using-the-package/init-options.md) for more information.

---

<br />

### 2. Add Environment Variables 

Add the required environment variables from the [Environment Variables](../getting-started/environment-variables.md) section.

<!-- Link References -->
[sso]: ../../using-the-package/apis-&-components/sso
