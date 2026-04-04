# ahmadaljrad.github.io

from weasyprint import HTML

# Updated Markdown content including EmailJS note
markdown_content_updated = """
# Complete Guide to Hosting a Resume Website on GitHub Pages with Custom Domain and SSL

## 1. Website Design
- Files:
  - `index.html` → main page
  - `style.css` → styling
  - `app.js` → interactivity + **EmailJS integration** for contact form
  - `data.json` → resume data
- Technologies used: **HTML, CSS, JavaScript**
- Features:
  - Interactive elements via JavaScript
  - **Contact form connected with EmailJS** for sending messages directly
- File separation allows easier updates and management.

---

## 2. Uploading to GitHub
1. Create a repository named:
   ```
ahmadaljarad.github.io
   ```
2. Upload files via CLI:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
3. Enable **GitHub Pages** in repository settings:
   - Branch: `main`
   - Folder: `/` (root)
4. Temporary URL:
   ```
   https://ahmadaljarad.github.io
   ```

---

## 3. Linking a Custom Domain `aljrad.com`

### 3.1 DNS Records (IPv4 only)

#### A Records (GitHub Pages IPv4)
| Type | Name/Host | Value |
|------|-----------|-------|
| A    | @         | 185.199.108.153 |
| A    | @         | 185.199.109.153 |
| A    | @         | 185.199.110.153 |
| A    | @         | 185.199.111.153 |

#### CNAME Record
| Type  | Name/Host | Value |
|-------|-----------|-------|
| CNAME | www       | ahmadaljarad.github.io |

> Wait 1–few hours for DNS propagation.

### 3.2 Verification
- Access your site via:
  ```
  http://aljrad.com
  http://www.aljrad.com
  ```

---

## 4. Enabling SSL via Cloudflare
1. Create an account on [Cloudflare](https://www.cloudflare.com/) and add `aljrad.com`.
2. Cloudflare imports your DNS records automatically.
3. Update **Nameservers** at your domain registrar to Cloudflare's Nameservers.
4. Enable SSL:
   - Mode: **Full** or **Flexible**
   - Cloudflare issues the SSL certificate automatically.
5. Access site securely:
   ```
   https://aljrad.com
   https://www.aljrad.com
   ```

---

## 5. Additional Notes
- To redirect www → root domain, use **Page Rule** in Cloudflare.
- Ensure all internal links use HTTPS after SSL activation.
- Enable **Automatic HTTPS Rewrites** in Cloudflare to prevent Mixed Content issues.
- Test the site on multiple devices and browsers after changes.

---

## 6. Process Flow Diagram

```text
+--------------------+       +------------------+       +----------------+
| Local Files        |  git  | GitHub Repository |  Git   | GitHub Pages   |
| index.html, ...    | ----> | ahmadaljarad     | ----> | Hosted URL     |
| app.js w/ EmailJS  |       |                  |       |                |
+--------------------+       +------------------+       +----------------+
                                      |
                                      | CNAME/A
                                      v
                               +----------------+
                               | Domain Registrar|
                               | DNS Records     |
                               +----------------+
                                      |
                                      v
                               +----------------+
                               | Cloudflare      |
                               | SSL/HTTPS       |
                               +----------------+
                                      |
                                      v
                               https://aljrad.com
"""

# Convert Markdown to HTML
html_content_updated = HTML(string=markdown_content_updated)

# Output PDF path
pdf_path_updated = "/mnt/data/GitHub_Pages_Resume_Full_Guide.pdf"
html_content_updated.write_pdf(pdf_path_updated)
pdf_path_updated
