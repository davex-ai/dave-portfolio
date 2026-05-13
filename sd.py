import requests
import base64
import os

def save_github_data(username, token=None):
    headers = {'Accept': 'application/vnd.github.v3+json'}
    if token:
        headers['Authorization'] = f'token {token}'

    # Create a folder for READMEs
    os.makedirs('github_readmes', exist_ok=True)

    # 1. Fetch repositories
    repo_url = f"https://github.com{username}/repos"
    response = requests.get(repo_url, headers=headers)
    
    if response.status_code != 200:
        print(f"Error: {response.json().get('message')}")
        return

    repos = response.json()

    # Open the summary file to write names and descriptions
    with open('repo_summary.txt', 'w', encoding='utf-8') as summary_file:
        summary_file.write(f"REPOS FOR {username.upper()}\n{'='*30}\n\n")

        for repo in repos:
            name = repo['name']
            desc = repo['description'] or "No description."
            
            # Write to summary file
            summary_file.write(f"Project: {name}\nDescription: {desc}\n{'-'*30}\n")

            # 2. Fetch and save individual README
            readme_url = f"https://github.com{username}/{name}/readme"
            res = requests.get(readme_url, headers=headers)

            if res.status_code == 200:
                content = base64.b64decode(res.json()['content']).decode('utf-8')
                with open(f"github_readmes/{name}_README.md", 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Saved: {name} README")
            else:
                print(f"Skipped: {name} (No README found)")

    print("\n--- Done! Check 'repo_summary.txt' and 'github_readmes' folder. ---")

# Replace with your handle
save_github_data('your_username')
