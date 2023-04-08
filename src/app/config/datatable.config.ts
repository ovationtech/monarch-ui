export const submissionsTableConfig = {
  displayedColumns: [
    'submission_id',
    'quote_id',
    'premium',
    'lob',
    'risk_company',
    'submit_date',
    'effective_date',
    'insured_name',
    'policy_number',
    'underwriter',
    'agency',
    'status',
  ],
  SearchColumns: [
    'submission_idSearch',
    'quote_idSearch',
    'premiumSearch',
    'lobSearch',
    'risk_companySearch',
    'submit_dateSearch',
    'effective_dateSearch',
    'insured_nameSearch',
    'policy_numberSearch',
    'underwriterSearch',
    'agencySearch',
    'statusSearch',
  ],
 
  fields: [
    {
      fieldName: 'submission_id',
      displayName: 'SUB#',
      search: {
        filterType: 'text',
      },
      sort: true,
      
    },
    {
      fieldName: 'submit_date',
      displayName: 'SUBMITTED',
      format: 'date',
      search: {
        filterType: 'date',
      },
      sort: true,
      toolTip:true
    },
    {
      fieldName: 'effective_date',
      displayName: 'EFEECTIVE',
      format: 'date',
      search: {
        filterType: 'date',
      },
      sort: true,
    },
    {
      fieldName: 'insured_name',
      displayName: 'INSURED',
      format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
    {
      fieldName: 'policy_number',
      displayName: 'POLICY#',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
    {
      fieldName: 'quote_id',
      displayName: 'QUOTE#',
     // format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
      route: '/main/quote',
    
    },
    {
      fieldName: 'premium',
      displayName: 'PREMIUM',
     // format: 'text',
      search: {
        filterType: 'text',
      },
      
    },
    {
      fieldName: 'lob',
      displayName: 'LOB',
     // format: 'text',
      search: {
        filterType: 'text',
      },
    },
    {
      fieldName: 'risk_company',
      displayName: 'RISK_COMP',
     // format: 'text',
      search: {
        filterType: 'text',
      },
    },
    {
      fieldName: 'underwriter',
      displayName: 'UW',
     format:'button',
     toolTip:'underwriter',
     search: {
      filterType: 'text',
    },
    },
    {
      fieldName: 'agency',
      displayName: 'AGENCY',
     format:'button',
     toolTip:'agency',
     search: {
      filterType: 'text',
    },
    },
    {
      fieldName: 'status',
      displayName: 'STATUS',
     format:'button',
     search: {
      filterType: 'text',
    },
    },
  ],
  
   
};

export const claimsTableConfig = {
  displayedColumns: [
    'claim_number',
    'policy_number',
    'effective_date',
    'loss_date',
    'reported_date',
    'claim_type',
    'claim_status',
    'claim_queue',
    'queue_assigned_to',
  ],
  SearchColumns: [
    'claim_numberSearch',
    'policy_numberSearch',
    'effective_dateSearch',
    'loss_dateSearch',
    'reported_dateSearch',
    'claim_typeSearch',
    'claim_statusSearch',
    'claim_queueSearch',
    'queue_assigned_toSearch',
  ],
  fields: [
    {
      fieldName: 'claim_number',
      displayName: 'Claim Number',
      format: 'text',
      route: '/claims',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
    {
      fieldName: 'policy_number',
      displayName: 'Policy Number',
      format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
    {
      fieldName: 'effective_date',
      displayName: 'Effective Date',
      format: 'date',
      search: {
        filterType: 'date',
      },
      sort: true,
    },
    {
      fieldName: 'loss_date',
      displayName: 'Loss Date',
      format: 'date',
      search: {
        filterType: 'date',
      },
      sort: true,
    },
    {
      fieldName: 'reported_date',
      displayName: 'Reported Date',
      format: 'date',
      search: {
        filterType: 'date',
      },
      sort: true,
    },
    {
      fieldName: 'claim_type',
      displayName: 'Claim Type',
      format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
    {
      fieldName: 'claim_status',
      displayName: 'Claim Status',
      format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
    {
      fieldName: 'claim_queue',
      displayName: 'Claim Queue',
      format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
    {
      fieldName: 'queue_assigned_to',
      displayName: 'Queue Assigned To',
      format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
  ],
};

export const claimantTableConfig = {
  displayedColumns: [
    'id',
    'claimant_name',
    'coverage_type',
    'incurred_status',
    'claimant_paid',
    'outstanding_expense',
    'actions',
  ],
  SearchColumns: [
    'idSearch',
    'claimant_nameSearch',
    'coverage_typeSearch',
    'incurred_statusSearch',
    'claimant_paidSearch',
    'outstanding_expenseSearch',
    'actionsSearch',
  ],
  fields: [
    {
      fieldName: 'id',
      displayName: 'Id',
      format: 'text',
      sort: true,
    },
    {
      fieldName: 'claimant_name',
      displayName: 'Claimant Name',
      format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
    {
      fieldName: 'coverage_type',
      displayName: 'Coverage Type',
      format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
    {
      fieldName: 'incurred_status',
      displayName: 'Claimate Status',
      format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
    {
      fieldName: 'claimant_paid',
      displayName: 'Paid',
      format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
    {
      fieldName: 'outstanding_expense',
      displayName: 'Check',
      format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
    {
      fieldName: 'actions',
      displayName: 'Claim Status',
      format: 'text',
      search: {
        filterType: 'text',
      },
      sort: true,
    },
  ],
};
