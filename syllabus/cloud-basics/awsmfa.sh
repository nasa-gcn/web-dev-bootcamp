# Complete MFA sign in for the AWS CLI.

source <(
  unset AWS_SESSION_TOKEN AWS_SECRET_ACCESS_KEY AWS_ACCESS_KEY_ID

  user_name="$(aws sts get-caller-identity --output text --query Arn | sed 's,.*user/,,')"
  if [ -z "${user_name}" ]; then
    >&2 echo 'error: cannot determine your AWS IAM user name'
    return 1
  fi
  >&2 printf 'User Name: %s\n' "${user_name}"

  device="$(aws iam list-mfa-devices --user-name ${user_name} --query 'MFADevices[*].SerialNumber' --output text | head -n 1)"
  if [ -z "${device}" ]; then
    >&2 echo '***error: cannot find any MFA devices for your AWS IAM user'
    return 1
  fi
  >&2 printf 'MFA Device: %s\n' "$(sed 's,.*mfa/,,' <<< "${device}")"

  >&2 echo -n '🔑 Enter your MFA code now: '
  read -s code
  >&2 echo

  >&2 read AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN expires < <(aws sts get-session-token --serial-number "${device}" --token-code ${code} --output text --query 'Credentials.[AccessKeyId,SecretAccessKey,SessionToken,Expiration]')
  if [ -z "${expires}" ]; then
    >&2 echo '***error: MFA code invalid'
    return 1
  fi

  >&2 printf 'Your session expires at %s\n' "${expires}"
  >&2 echo 'Setting the following environment variables in your shell:'
  >&2 echo '  ARC_AWS_CREDS'
  >&2 echo '  AWS_ACCESS_KEY_ID'
  >&2 echo '  AWS_SECRET_ACCESS_KEY'
  >&2 echo '  AWS_SESSION_TOKEN'
  printf 'export ARC_AWS_CREDS=env\n'
  printf 'export AWS_ACCESS_KEY_ID="%s"\n' "${AWS_ACCESS_KEY_ID}"
  printf 'export AWS_SECRET_ACCESS_KEY="%s"\n' "${AWS_SECRET_ACCESS_KEY}"
  printf 'export AWS_SESSION_TOKEN="%s"\n' "${AWS_SESSION_TOKEN}"
)
