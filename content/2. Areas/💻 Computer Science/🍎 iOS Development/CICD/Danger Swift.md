```
# - name: Check Danger Output

# id: check_danger_output

# run: |

# results=${{ steps.danger.outputs.danger_results }}

# echo "Danger Results: $results"

# continue-on-error: true

# - name: Trigger Linter Workflow on Success

# if: steps.check_danger_output.outputs.danger_results != 'fail'

# uses: ./.github/workflows/linter_nomura_github.yml
```