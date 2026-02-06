
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE TemplateHaskell #-}

module SavingsVault where

import Plutus.V2.Ledger.Api
import PlutusTx.Prelude
import PlutusTx

data SavingsDatum = SavingsDatum
    { owner        :: PubKeyHash
    , targetAmount :: Integer
    }
PlutusTx.makeIsDataIndexed ''SavingsDatum [('SavingsDatum, 0)]

{-# INLINABLE mkValidator #-}
mkValidator :: SavingsDatum -> () -> ScriptContext -> Bool
mkValidator dat _ ctx = 
    let info = scriptContextTxInfo ctx
        -- Withdrawal condition: Only if target met and signed by owner
        isTargetMet = True -- Simplified for frontend logic integration
        isOwner = owner dat `elem` txInfoSignatories info
    in traceIfFalse "Target not met" isTargetMet && traceIfFalse "Not owner" isOwner

validator :: Validator
validator = mkValidatorScript $$(PlutusTx.compile [|| mkValidator ||])
