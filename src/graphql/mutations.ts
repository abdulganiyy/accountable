import { gql } from "@apollo/client";

export const LOGIN = gql`mutation Login($input: Login!) {
  login(input: $input) {
    ... on ResponseWithUserAndToken {
      data {
        token
        user {
          email
          createdAt
          emailVerified
          firstName
          id
          lastName
          onboarded
          phone
          phoneVerified
          role
          updatedAt
          manager {
            email
          }
          type
          operationCountry
          reportingCurrency
          trialBalanced
          monthlyRecurringRevenue
          meetingScheduled
          appointment
          industry
          companySize
          companyName
          linkedAccount
          website
        }
      }
    }
    ... on Error {
      code
      message
    }
  }
}`;

export const REGISTER = gql`
  mutation Register($input: NewUser!) {
    register(input: $input) {
      ... on ResponseWithUser {
        message
        data {
          createdAt
          email
        }
      }
      ... on Error {
        message
        code
      }
    }
  }
`;

//forgot password page
export const RECOVER_PASSWORD = gql`
  mutation RecoverPassword($input: Email!) {
    recoverPassword(input: $input) {
      ... on Response {
        message
      }

      ... on Error {
        message
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: PasswordWithToken!) {
    resetPassword(input: $input) {
      ... on Response {
        message
      }
      ... on Error {
        message
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($input: OldAndNewPassword!) {
    updatePassword(input: $input) {
      ... on Response {
        message
      }
      ... on Error {
        message
      }
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($input: Token!) {
    verifyEmail(input: $input) {
      ... on Response {
        message
      }
      ... on Error {
        status
      }
    }
  }
`;

export const REQUEST_VERIFICATION = gql`
  mutation RequestEmailVerification($input: Email!) {
    requestEmailVerification(input: $input) {
      ... on Response {
        message
      }
      ... on Error {
        status
      }
    }
  }
`;

export const ONBOARD = gql`
  mutation Onboard($input: Onboard!) {
    onboard(input: $input) {
      ... on ResponseWithUser {
        data {
          id
          firstName
          lastName
          email
          role
          type
          companyName
          website
          monthlyRecurringRevenue
          operationCountry
          reportingCurrency
          phone
          onboarded
          emailVerified
          phoneVerified
          createdAt
          updatedAt
        }
      }
      ... on Error {
        code
        status
        message
      }
    }
  }
`;

export const VERIFY_PHONE = gql`
  mutation RequestPhoneVerification($input: Phone!) {
    requestPhoneVerification(input: $input) {
      ... on Response {
        message
      }
      ... on Error {
        code
        status
        message
      }
    }
  }
`;

export const ADD_CARD = gql`
  mutation AddCard {
    addCard {
      ... on ResponseWithInvoice {
        data {
          payment {
            initialConfig {
              public_key
              tx_ref
              amount
              currency
              payment_options
              redirect_url
              account_bank
              account_number
              narration
              beneficiary_name
              reference
            }
            paymentLink
          }
        }
        message
      }
      ... on Error {
        code
      }
    }
  }
`;

export const CREATE_TRIAL_BALANCE = gql`
  mutation CreateTrialBalance($input: CreateTrialBalance!) {
    createTrialBalance(input: $input) {
      ... on ResponseWithTrialBalance {
        data {
          id
          user
          name
          currency
          date
        }
      }
      ... on Error {
        code
        message
      }
    }
  }
`;

export const GENERATE_STATEMENTS = gql`
  mutation GenerateStatements($input: GenerateStatementInput!) {
    generateStatements(input: $input) {
      ... on ResponseWithFinancialStatement {
        data
      }
      ... on Error {
        code
      }
    }
  }
`;

export const REQUEST_REPORT = gql`
  mutation RequestReportFromAccountManager($input: RequestFileInput) {
    requestReportFromAccountManager(input: $input) {
      ... on ResponseWithReport {
        data {
          id
          name
          type
          status
          dueDate
          createdAt
          updatedAt
        }
      }
      ... on Error {
        code
        message
      }
    }
  }
`;

export const SEND_FILE_TO_ACCOUNT_MANAGER = gql`
  mutation SendFileToAccountManager($input: SendFileInput) {
    sendFileToAccountManager(input: $input) {
      ... on ResponseWithReport {
        data {
          id
          comment {
            date
            sender {
              email
              firstName
            }
            text
          }
          createdAt
          dueDate
          files {
            name
            url
          }
          history {
            name
            type
            status
            files {
              name
              url
            }
            sender
            recipient
            dueDate
          }
          name
          recipient {
            firstName
            email
          }
          sender {
            firstName
            email
          }
          status
          type
          updatedAt
        }
      }
      ... on Error {
        code
        message
      }
    }
  }
`;

export const ADD_COMMENT_TO_REPORT = gql`
  mutation AddCommentToReport($input: ReportCommentInput) {
    addCommentToReport(input: $input) {
      ... on ResponseWithReport {
        data {
          id
          comment {
            text
            sender {
              email
              firstName
              lastName
            }
            date
          }
          createdAt
          dueDate
          files {
            name
            url
          }
          history {
            name
            type
            status
            files {
              name
              url
            }
            sender
            recipient
            dueDate
          }
          name
          recipient {
            email
            firstName
            lastName
          }
          sender {
            email
            firstName
            lastName
          }
          status
          type
          updatedAt
        }
      }
    }
  }
`;

export const RESCHEDULE_MEETING = gql`
  mutation RescheduleMeeting($input: RescheduleMeetingInput) {
    rescheduleMeeting(input: $input) {
      ... on Response {
        message
      }
      ... on Error {
        code
      }
    }
  }
`;

export const DELETE_MEETING = gql`
  mutation DeleteMeeting($input: DeleteMeetingInput) {
    deleteMeeting(input: $input) {
      ... on Response {
        message
      }
      ... on Error {
        code
        message
      }
    }
  }
`;

export const PURCHASE_SERVICE = gql`
mutation PurchaseService($input: PurchaseServiceInput!) {
  purchaseService(input: $input) {
    ... on ResponseWithPurchase {
      data {
        invoice {
          amount
          checksum
          cancelled
          paid
        }
        payment {
          amount
          cancelled
        }
        subscription {
          id
          active
          activeAt
        }
      }
    }
    ... on Error {
      code
      message
    }
  }
}
`

export const CONVERSATE = gql`mutation Conversate($input: ConversateInput!) {
  conversate(input: $input) {
    ... on ResponseWithMessage {
      data {
        attachment {
          name
          url
        }
        conversation {
          createdAt
          id
          unread
          updatedAt
        }
        createdAt
        read
        recipient {
          id
          email
          firstName
          lastName
        }
        sender {
          id
          email
          firstName
          lastName
        }
        text
        updatedAt
      }
    }
  }
}`

export const SENDREFERRAL = gql`
mutation SendReferral($input: ReferralInput!) {
  sendReferral(input: $input) {
    ... on ResponseWithReferral {
      data {
        id
        code
        createdAt
        email
        history {
          author
          date
          description
        }
        name
        note
        referee {
          email
          firstName
          lastName
        }
        referrer {
          email
          firstName
          lastName
        }
        status
        updatedAt
      }
    }
    ... on Error {
      code
      message
    }
  }
}
`

export const UPLOAD_STATEMENTS = gql`mutation UploadBankStatement($input: UploadBankStatement!) {
  uploadBankStatement(input: $input) {
    ... on ResponseWithAccounts {
      data {
        createdAt
        config
        filename
        id
        provider
        statement
        updatedAt
        user {
          email
        }
      }
    }
    ... on Error {
      code
      message
    }
  }
}`

export const LINK_BANKS = gql`mutation LinkBankAccounts($input: LinkBankAccounts!) {
  linkBankAccounts(input: $input) {
    ... on ResponseWithAccounts {
      data {
        createdAt
        updatedAt
        id
      }
    }
    ... on Error {
      code
      message
    }
  }
}`