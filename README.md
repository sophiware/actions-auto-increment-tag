# Auto increment tag

This action adds one more to the last number of a tag. 

Example: 1.23.45 to 1.23.46, v4.03 to v4.4, 1.12-beta to 1.13-beta, 9 to 10.

## Inputs

### `token`

Secret github token: ${{secrets.GITHUB_TOKEN}}

## Outputs

### `tag`

Tag created.

## Example

```yaml
steps:
  - name: Auto increment tag
    id: tag
    uses: sophiware/actions-auto-increment-tag@v1
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
  - name: Container tag
    uses: docker tag myname/mycontainer myname/mycontainer:${{ steps.tag.outputs.tag }}
```
