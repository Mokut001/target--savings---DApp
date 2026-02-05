
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module TargetVault where

import Plutus.V2.Ledger.Api
import PlutusTx.Prelude
import PlutusTx

data SavingsDatum = SavingsDatum
    { owner        :: PubKeyHash
    , targetAmount :: Integer -- in Lovelace
    }

PlutusTx.makeIsDataIndexed ''SavingsDatum [('SavingsDatum, 0)]

{-# INLINABLE mkValidator #-}
mkValidator :: SavingsDatum -> () -> ScriptContext -> Bool
mkValidator dat _ ctx = 
    let info = scriptContextTxInfo ctx
        -- Check if current script UTxO balance meets target
        totalBalance = valueSpent info -- Simplified check
        isOwner = owner dat `elem` txInfoSignatories info
    in traceIfFalse "Target not met" (totalBalance >= targetAmount dat) &&
       traceIfFalse "Unauthorized" isOwner

validator :: Validator
validator = mkValidatorScript $$(PlutusTx.compile [|| mkValidator ||])
